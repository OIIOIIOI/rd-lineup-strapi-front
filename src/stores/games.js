import { defineStore } from 'pinia'
import axios from 'axios'
import {API} from '../api/config'
import {useTeamStore} from '@/stores/teams'

export const useGameStore = defineStore({
	id: 'games',
	state: () => ({
		games: [],
		chosenGame: null,
		currentJam: 0,
	}),
	getters: {
		getGames: (state) => state.games,
		getChosenGame: (state) => state.chosenGame,
		getJamCount: (state) => state.chosenGame != null ? state.chosenGame.jams.length : 0,
	},
	actions: {
		async fetchGames() {
			try {
				const response = await axios.get(`/games?populate=teams`)
				// console.log(response.data)
				// console.groupCollapsed('details')
				// let d = API.parseData(response.data)
				// console.groupEnd()
				// console.log(d)
				this.games = API.parseData(response.data)
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		async fetchGame(gameID) {
			try {
				const response = await axios.get(`/games/${gameID}?populate=jams,teams`)
				this.chosenGame = API.parseData(response.data)
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		async addJam(skaters) {
			try {
				const response = await axios.post('/jams', {
					data: {
						number: this.getJamCount+1,
						game: this.chosenGame,
						skaters: skaters,
					}
				})
				const cleanResponse = API.parseData(response.data)
				// Store jam in game
				this.chosenGame.jams.push(cleanResponse)
				// Store jam in team
				const teamStore = useTeamStore()
				skaters.forEach((s) => {
					teamStore.addJam(s.id, cleanResponse)
				})
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		/*async addGame() {
			try {
				const response = await axios.post('/games', {
					data: {}
				})
				this.games.push(API.parseData(response.data))
			}
			catch (error) {
				console.log(error)
				return error
			}
		},*/
	},
})
