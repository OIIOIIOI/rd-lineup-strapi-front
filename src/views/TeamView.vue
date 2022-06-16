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
	/*forEach(this.mainStore.allOnTheTrack, function(s) {
		s.ott = false
	})*/
	
	// Stop here if no selection
	if (teamStore.getSelectedSkaters.length === 0)
		return
	
	// Store jam
	gameStore.addJam(teamStore.getSelectedSkaters).then(() => {
		// Toggle selection
		forEach(teamStore.getSelectedSkaters, (s) => {
			s.active = false
		})
	})
}
</script>

<template>
	<main class="h-screen p-4 flex flex-col justify-end">
		<p v-if="teamStore.getChosenTeam">SKATERS: {{ teamStore.getSelectedSkaters.length }}</p>
		<p>JAMS: {{ gameStore.getJamCount }}</p>
		<!-- SKATERS GRID -->
		<div v-if="teamStore.getChosenTeam">
			<div class="grid grid-cols-4 gap-2">
				<skater-card v-for="s in teamStore.getSkaters"
				             @toggled="(s) => skaterToggled(s)"
				             :skater="s"></skater-card>
			</div>
		</div>
		<!-- ACTIONS BUTTONS -->
		<footer class="grid grid-cols-8 gap-2 mt-4">
			<button @click="sendToTheTrack" class="btn-go">GO</button>
		</footer>
	</main>
</template>

<script>
export default { name: "TeamView" }
</script>

<style scoped>
button, a {
	@apply w-full border-0 bg-zinc-800 py-6 col-span-1 text-center;
}
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
	@apply col-span-8 font-bold bg-zinc-300 text-zinc-800;
}
</style>