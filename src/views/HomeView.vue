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
	<div class="grid grid-cols-1 gap-4 h-screen p-4">
		<RouterLink class="col-span-1 flex justify-center items-center border"
		            v-for="g in gameStore.getGames"
		            :to="{ name: 'gameChoice', params: { 'gid': g.id }}">
			<div class="grid grid-cols-2 w-full">
				<span class="col-span-1 py-1 text-center font-bold first:border-r-2"
				      v-if="g.teams"
				      v-for="t in g.teams">{{ t.name }}</span>
				<span class="col-span-2 py-1 text-center">{{ getDate(g.datetime) }}</span>
			</div>
		</RouterLink>
	</div>
</template>

<script>
export default {
	name: "HomeView",
}
</script>

<style scoped>

</style>