import { defineStore } from 'pinia'
import axios from 'axios'
import {find, filter, sortBy} from "lodash/collection"
import {API} from '../api/config'

export const useTeamStore = defineStore({
	id: 'teams',
	state: () => ({
		chosenTeam: null,
		opposingTeam: null,
	}),
	getters: {
		getChosenTeam: (state) => state.chosenTeam,
		getOpposingTeam: (state) => state.opposingTeam,
		getSelectedSkaters: (state) => {
			if (state.chosenTeam == null)
				return []
			return filter(state.chosenTeam.skaters, ['active', true])
		},
		getSkaters: (state) => {
			if (state.chosenTeam == null)
				return []
			let filtered = filter(state.chosenTeam.skaters, (s) => {
				return s.skater_role ? s.skater_role.id !== 4 : true
			})
			// return filtered
			return sortBy(filtered, (s) => {
				return s.skater_role ? s.skater_role.order : s.number
			})
		},
	},
	actions: {
		async fetchTeam(teamID, chosen = true) {
			try {
				// const response = await axios.get(`/teams/${teamID}?populate=skaters`)
				const response = await axios.get(`/teams/${teamID}?populate[skaters][populate][0]=team&populate[skaters][populate][1]=skater_role`)
				
				if (chosen)
					this.chosenTeam = API.parseData(response.data)
				else
					this.opposingTeam = API.parseData(response.data)
			}
			catch (error) {
				console.log(error)
				return error
			}
		},
		toggleSkater(skaterID) {
			const res = find(this.chosenTeam.skaters, ['id', skaterID])
			if (typeof res != 'undefined')
				res.active = typeof res.active != 'undefined' ? !res.active : true
		},
	},
})
