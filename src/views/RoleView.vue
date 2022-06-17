<script setup>
import {RouterLink, useRoute} from 'vue-router'
import {useGameStore} from '@/stores/games'
import {useTeamStore} from '@/stores/teams'
import {onMounted} from "vue"

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
	<main class="h-screen p-4 flex flex-col space-y-4 justify-end">
		<header class="flex-grow flex justify-end">
			<RouterLink class="w-8 h-8 bg-red-900 flex items-center justify-center text-sm"
			            :to="{ name: 'home' }">
				<font-awesome-icon icon="fa-solid fa-house" />
			</RouterLink>
		</header>
		<RouterLink class="button"
		            v-if="gameStore.getChosenGame && teamStore.getChosenTeam"
		            :to="{ name: 'lineup', params: { gid: gameStore.getChosenGame.id, tid: teamStore.getChosenTeam.id }}">Lineup</RouterLink>
		<RouterLink class="button"
		            v-if="gameStore.getChosenGame && teamStore.getChosenTeam"
		            :to="{ name: 'stats', params: { gid: gameStore.getChosenGame.id, tid: teamStore.getChosenTeam.id }}">Stats</RouterLink>
	</main>
</template>

<script>
export default {
	name: "RoleView"
}
</script>

<style scoped>

</style>