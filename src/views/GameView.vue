<script setup>
import {onMounted} from 'vue'
import {useRoute, useRouter, RouterLink} from 'vue-router'
import {useGameStore} from '@/stores/games'

const gameStore = useGameStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
	gameStore.fetchGames().then(() => {
		gameStore.fetchGame(route.params.gid)
	})
})

function deleteGame () {
	console.log('delete game')
	gameStore.deleteGame().then(() => {
		router.push({ name: 'home' })
	})
}

function resetGame () {
	gameStore.resetGame()
}
</script>

<template>
	<main class="h-screen p-4 flex flex-col space-y-4 justify-end">
		<header class="flex-grow flex justify-end">
			<RouterLink class="w-8 h-8 bg-red-900 flex items-center justify-center text-sm"
			            :to="{ name: 'home' }">
				<font-awesome-icon icon="fa-solid fa-house" />
			</RouterLink>
		</header>
		<RouterLink class="team-card"
		            v-if="gameStore.getChosenGame"
		            v-for="t in gameStore.getChosenGame.teams"
		            :to="{ name: 'roleChoice', params: { gid: gameStore.getChosenGame.id, tid: t.id }}">
			<p class="font-bold">{{ t.name }}</p>
		</RouterLink>
		<footer class="w-full grid grid-cols-2 text-center"
		        v-if="gameStore.getChosenGame">
			<button class="!bg-red-800"
			        @dblclick="deleteGame">
				<font-awesome-icon icon="fa-solid fa-trash" />
			</button>
			<button class="!bg-amber-700"
			        @dblclick="resetGame">
				<font-awesome-icon icon="fa-solid fa-backward-fast" />
			</button>
		</footer>
	</main>
</template>

<script>
export default {
	name: "GameView"
}
</script>

<style scoped>
a.team-card {
	@apply flex flex-col justify-center items-center py-4 text-center;
	@apply bg-zinc-800 text-zinc-300;
}
</style>