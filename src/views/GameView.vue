<script setup>
import {onMounted} from 'vue'
import {useRoute, RouterLink} from 'vue-router'
import {useGameStore} from '@/stores/games'

const gameStore = useGameStore()
const route = useRoute()

onMounted(() => {
	gameStore.fetchGame(route.params.gid)
})
</script>

<template>
	<div class="grid grid-cols-1 gap-4 h-screen p-4">
		<RouterLink class="col-span-1 font-bold flex justify-center items-center border"
		            v-if="gameStore.getChosenGame"
		            v-for="t in gameStore.getChosenGame.teams"
		            :to="{ name: 'teamChoice', params: { gid: gameStore.getChosenGame.id, tid: t.id }}">
			<p>{{ t.name }}</p>
		</RouterLink>
	</div>
</template>

<script>
export default {
	name: "GameView"
}
</script>

<style scoped>

</style>