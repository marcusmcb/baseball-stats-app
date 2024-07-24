import axios from 'axios'

export const getPlayers = async () => {
	try {
		const response = await axios.get('http://localhost:5000/api/players')
		return response.data
	} catch (error) {
		console.error('Error fetching players:', error)
		throw error
	}
}

export const editPlayer = async (id, player) => {
	try {
		const response = await axios.put(
			`http://localhost:5000/api/players/${id}`,
			player
		)
		return response.data
	} catch (error) {
		console.error('Error editing player:', error)
		throw error
	}
}

export const getPlayerDescription = async (name) => {	
	try {
		const response = await axios.post(
			'http://localhost:5000/api/player-description',
			{ name }
		)		
		return response.data.description
	} catch (error) {
		console.error('Error fetching player description:', error)
	}
}
