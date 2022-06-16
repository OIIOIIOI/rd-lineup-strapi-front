import {API} from './config'

export default {
	getGames ()
	{
		return fetch(`${API.baseURL}/games?populate=teams`, {
			method: 'GET',
			headers: API.headers.get,
		})
		.then(response => response.json())
	},
	getGame (gameID)
	{
		return fetch(`${API.baseURL}/games/${gameID}?populate=teams`, {
			method: 'GET',
			headers: API.headers.get,
		})
		.then(response => response.json())
	},
	getTeam (teamID)
	{
		return fetch(`${API.baseURL}/teams/${teamID}`, {
			method: 'GET',
			headers: API.headers.get,
		})
		.then(response => response.json())
	},
}