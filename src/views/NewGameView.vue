<script setup>
import dayjs from 'dayjs'
import {RouterLink, useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'
import {useGameStore} from '@/stores/games'
import {useTeamStore} from '@/stores/teams'

const router = useRouter()

const gameStore = useGameStore()
const teamStore = useTeamStore()

let teamA = ref(2)
let teamB = ref('none')
let date = ref(dayjs())

onMounted(() => {
	teamStore.fetchTeams()
})

function addGame () {
	const data = {
		datetime: date.value,
		teams: [teamA.value, teamB.value],
	}
	gameStore.addGame(data).then(() => {
		router.push({ name: 'home' })
	})
}
</script>

<template>
	<main class="h-screen p-4 flex flex-col space-y-4 justify-end">
		<select v-if="teamStore.teams.length > 0"
		        v-model="teamA"
		        class="text-black">
			<option value="none">----</option>
			<option v-for="t in teamStore.teams" :value="t.id">{{ t.name }}</option>
		</select>
		<select v-if="teamStore.teams.length > 0"
		        v-model="teamB"
		        class="text-black">
			<option value="none">----</option>
			<option v-for="t in teamStore.teams" :value="t.id">{{ t.name }}</option>
		</select>
		<date-picker v-model="date"></date-picker>
		<footer class="w-full grid grid-cols-2 text-center">
			<RouterLink class="button !bg-red-800"
			            :to="{ name: 'home' }">
				<font-awesome-icon icon="fa-solid fa-house" />
			</RouterLink>
			<button class="!bg-zinc-300 !text-zinc-800"
			        @click="addGame">
				<font-awesome-icon icon="fa-solid fa-check" />
			</button>
		</footer>
	</main>
</template>

<script>
export default {
	name: "NewGameView"
}
</script>

<style scoped>

</style>