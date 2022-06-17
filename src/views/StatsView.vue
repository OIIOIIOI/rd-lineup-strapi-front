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
	gameStore.fetchGames().then(() => {
		gameStore.fetchGame(route.params.gid).then(() => {
			teamStore.fetchTeam(route.params.tid, true)
		})
	})
})
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
		<div v-if="teamStore.getOpposingTeam">
			<div class="grid grid-cols-4 gap-2">
				<skater-card v-for="s in teamStore.getSkaters"
				             @toggled="(s) => skaterToggled(s)"
				             :skater="s"
				             :jams="getSkaterJams(s.id, gameStore.getChosenGame.id)"></skater-card>
			</div>
		</div>
		<!-- ACTIONS BUTTONS -->
		<footer class="grid grid-cols-8 gap-2 mt-4">
<!--			<div @click="sendToTheTrack" class="button btn-go flex space-x-4 justify-center items-center">
				<div class="">
					<span class="block">START</span>
					<span>JAM {{ gameStore.getJamCount+1 }}</span>
				</div>
				<div class="text-2xl">
					<font-awesome-icon icon="fa-solid fa-hand-point-right" />
				</div>
			</div>-->
		</footer>
	</main>
</template>

<script>
export default {
	name: "StatsView"
}
</script>

<style scoped>

</style>