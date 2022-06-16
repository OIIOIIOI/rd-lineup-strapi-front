<script setup>
import {RouterView} from 'vue-router'
import {useGameStore} from '@/stores/games'
import {useTeamStore} from '@/stores/teams'

const gameStore = useGameStore()
const teamStore = useTeamStore()
</script>

<template>
	<div class="absolute top-0 right-0 bg-black/75 text-xs">
		<span class="px-1" v-if="gameStore.getChosenGame">G{{ gameStore.getChosenGame.id }}</span>
		<span class="px-1" v-if="teamStore.getChosenTeam">T{{ teamStore.getChosenTeam.id }}</span>
	</div>
	<RouterView/>
</template>

<style>
@import '@/assets/style.css';
</style>
