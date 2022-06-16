export const API = {
	baseURL: import.meta.env.VITE_API_URL,
	token: import.meta.env.VITE_API_TOKEN,
	headers: {
		get: {
			'Content-Type': 'application/json',
		},
		post: {
			'Content-Type': 'application/json',
			'Authorization': `bearer ${import.meta.env.VITE_API_TOKEN}`,
		},
	},
}