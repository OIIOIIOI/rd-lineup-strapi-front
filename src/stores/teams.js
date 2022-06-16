import { defineStore } from 'pinia'
import axios from 'axios'
import {find, filter} from "lodash/collection"

export const useTeamStore = defineStore({
	id: 'teams',
	state: () => ({
		chosenTeam: null,
		opposingTeam: null,
	}),
	getters: {
		getChosenTeam: (state) => state.chosenTeam,
		getOpposingTeam: (state) => state.opposingTeam,
		getActiveSkaters: (state) => {
			if (state.chosenTeam == null)
				return []
			return filter(state.chosenTeam.attributes.skaters.data, ['active', true])
		}
	},
	actions: {
		async fetchTeam(teamID, chosen = true) {
			try {
				// const response = await axios.get(`/teams/${teamID}?populate=skaters`)
				const response = await axios.get(`/teams/${teamID}?populate[skaters][populate][0]=team&populate[skaters][populate][1]=skater_role`)
				if (chosen)
					this.chosenTeam = response.data.data
				else
					this.opposingTeam = response.data.data
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		toggleSkater(skaterID) {
			const res = find(this.chosenTeam.attributes.skaters.data, ['id', skaterID])
			if (typeof res != 'undefined')
				res.active = typeof res.active != 'undefined' ? !res.active : true
		},
	},
})
