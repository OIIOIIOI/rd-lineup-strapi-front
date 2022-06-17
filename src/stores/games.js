import { defineStore } from 'pinia'
import axios from 'axios'
import {API} from '../api/config'
import {useTeamStore} from '@/stores/teams'
import {find} from "lodash/collection"

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
		async deleteGame() {
			try {
				await axios.delete(`/games/${this.chosenGame.id}`)
				this.chosenGame = null
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		async resetGame() {
			try {
				await axios.put(`/games/${this.chosenGame.id}`, {
					data: {
						jams: null,
					}
				})
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
				// Get unpopulated game
				const res = find(this.games, ['id', this.chosenGame.id])
				if (typeof res != 'undefined')
				{
					cleanResponse.game = res
					skaters.forEach((s) => {
						teamStore.addJam(s.id, cleanResponse)
					})
				}
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		async addGame(data) {
			try {
				const response = await axios.post('/games', {
					data: data
				})
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
	},
})
