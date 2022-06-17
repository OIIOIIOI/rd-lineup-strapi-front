<script setup>
import {remove} from 'lodash/array'
import {forEach} from 'lodash/collection'
import {onMounted, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import {useGameStore} from '@/stores/games'
import {useTeamStore} from '@/stores/teams'
import SkaterCard from '@/components/SkaterCard.vue'

const gameStore = useGameStore()
const teamStore = useTeamStore()
const route = useRoute()

const getSkaterJams = teamStore.getSkaterJams

onMounted(() =>
{
	gameStore.fetchGame(route.params.gid).then(() => {
		teamStore.fetchTeam(route.params.tid, true)
	})
})

function skaterToggled (skater)
{
	teamStore.toggleSkater(skater.id)
}

function sendToTheTrack ()
{
	// recall ott skaters
	forEach(teamStore.getOTTSkaters, (s) => {
		s.ott = false
	})
	// Stop here if no selection
	if (teamStore.getSelectedSkaters.length === 0)
		return
	// Store jam
	gameStore.addJam(teamStore.getSelectedSkaters).then(() => {
		// Toggle selection
		forEach(teamStore.getSelectedSkaters, (s) => {
			s.ott = true
			teamStore.toggleSkater(s.id)
		})
	})
}
</script>

<template>
	<main class="h-screen p-4 flex flex-col justify-end">
		<header class="flex-grow flex justify-end">
			<RouterLink class="w-8 h-8 bg-red-900 flex items-center justify-center text-sm"
			            :to="{ name: 'home' }">
				<font-awesome-icon icon="fa-solid fa-house" />
			</RouterLink>
		</header>
		<!-- SKATERS GRID -->
		<div v-if="teamStore.getChosenTeam">
			<div class="grid grid-cols-4 gap-2">
				<skater-card v-for="s in teamStore.getSkaters"
				             @toggled="(s) => skaterToggled(s)"
				             :skater="s"
				             :jams="getSkaterJams(s.id, gameStore.getChosenGame.id)"></skater-card>
			</div>
		</div>
		<!-- ACTIONS BUTTONS -->
		<footer class="grid grid-cols-8 gap-2 mt-4">
			<div @click="sendToTheTrack" class="button btn-go flex space-x-4 justify-center items-center">
				<div class="">
					<span class="block">START</span>
					<span>JAM {{ gameStore.getJamCount+1 }}</span>
				</div>
				<div class="text-2xl">
					<font-awesome-icon icon="fa-solid fa-hand-point-right" />
				</div>
			</div>
		</footer>
	</main>
</template>

<script>
export default { name: "TeamView" }
</script>

<style scoped>
.btn-reset {
	@apply bg-red-900;
}
.btn-minus {
}
.btn-edit {
	@apply bg-orange-900;
}
.btn-clear {
	@apply col-span-2 bg-zinc-700;
}
.btn-go {
	@apply col-span-8 font-bold bg-zinc-300 text-zinc-800 leading-none;
}
</style>