import { defineStore } from 'pinia'
import axios from 'axios'

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
		getJamCount: (state) => state.chosenGame != null ? state.chosenGame.attributes.jams.data.length : 0,
	},
	actions: {
		async fetchGames() {
			try {
				const response = await axios.get('/games?populate=teams')
				this.games = response.data.data
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		async fetchGame(gameID) {
			try {
				const response = await axios.get(`/games/${gameID}?populate=jams,teams`)
				this.chosenGame = response.data.data
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
				this.chosenGame.attributes.jams.data.push(response.data.data)
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		/*async addGame() {
			try {
				const response = await axios.post('/games', {
					data: {
						datetime: DJS(),
					}
				})
				this.games.push(response.data.data)
			}
			catch (error) {
				console.log(error)
				return error
			}
		},*/
	},
})
