<script setup>
import dayjs from 'dayjs'
import {RouterLink} from 'vue-router'
import {onMounted} from 'vue'
import {useGameStore} from '@/stores/games'

const gameStore = useGameStore()

function getDate (d) {
	return dayjs(d).format('DD MMMM - HH:mm')
}

onMounted(() => {
	gameStore.fetchGames()
})
</script>

<template>
	<main class="h-screen p-4 flex flex-col space-y-4 justify-end">
		<RouterLink class="game-card"
		            v-for="g in gameStore.getGames"
		            :to="{ name: 'gameChoice', params: { 'gid': g.id }}">
			<span class="font-bold"
			      v-if="g.teams"
			      v-for="t in g.teams">{{ t.name }}</span>
			<span class="mt-1">{{ getDate(g.datetime) }}</span>
		</RouterLink>
		<footer class="w-full grid grid-cols-1 text-center">
			<RouterLink class="button !bg-zinc-300 !text-zinc-800 text-xl"
			            :to="{ name: 'addGame' }">
				<font-awesome-icon icon="fa-solid fa-circle-plus" />
			</RouterLink>
		</footer>
	</main>
</template>

<script>
export default {
	name: "HomeView",
}
</script>

<style scoped>
a.game-card {
	@apply flex flex-col justify-center items-center text-center py-4;
	@apply bg-zinc-800 text-zinc-300;
}
</style>