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
	parseData: (data) => {
		const isObject = (data) => Object.prototype.toString.call(data) === "[object Object]"
		const isArray = (data) => Object.prototype.toString.call(data) === "[object Array]"
		
		const flatten = (data) => {
			if (!data.attributes) {
				return data
			}
			return {
				id: data.id,
				...data.attributes,
			}
		}
		
		if (isArray(data))
		{
			return data.map((item) => API.parseData(item))
		}
		
		if (isObject(data))
		{
			if (isArray(data.data))
			{
				data = [...data.data]
			}
			else if (isObject(data.data))
			{
				data = flatten({...data.data})
			}
			else if (data.data === null)
			{
				data = null
			}
			else
			{
				data = flatten(data)
			}
			
			for (const key in data) {
				data[key] = API.parseData(data[key])
			}
			
			return data
		}
		return data
	},
}