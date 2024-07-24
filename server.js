const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const Player = require('./db/database')

// import environment variables
const dotenv = require('dotenv')
dotenv.config()

// configure express app
const app = express()
const PORT = process.env.PORT || 5000

// configure middleware
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

// endpoint to retrieve API data and insert into MongoDB
app.get('/api/players', async (req, res) => {
	try {
		await Player.deleteMany({})
		console.log('Cleared existing player data')
		const response = await axios.get(
			'https://api.sampleapis.com/baseball/hitsCareer'
		)

		let lastValidRank = 0

		const players = response.data.map((player) => {
			let rank
			if (player.Rank && player.Rank !== '') {
				rank = parseInt(player.Rank.replace('.', ''))
				lastValidRank = rank
			} else {
				rank = lastValidRank + 1
				lastValidRank = rank
			}

			return {
				name: player.Player.replace('+', ''),
				hits: parseInt(player.Hits) || 0,
				throws: player.Throws,
				rank: rank,
				id: player.id,
			}
		})
		console.log('Inserting players into MongoDB...')
		await Player.insertMany(players, { ordered: false })
		console.log('Players inserted successfully')
		res.status(200).json(players)
	} catch (error) {
		console.error('Error inserting players:', error)
		res.status(500).json({ error: error.message })
	}
})

// edit a player by ID
app.put('/api/players/:id', async (req, res) => {
	console.log('EDITING PLAYER: ', req.body)
	try {
		const player = await Player.findOneAndUpdate(
			{ id: Number(req.params.id) },
			req.body,
			{
				new: true,
			}
		)
		res.status(200).json(player)
	} catch (error) {
		console.error('Error updating player:', error)
		res.status(500).json({ error: error.message })
	}
})

// Add this route to call Hugging Face API for player description
app.post('/api/player-description', async (req, res) => {
	const { name } = req.body
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: `Generate a short description of the baseball player named ${name}.`,
					},
				],
				max_tokens: 100,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		)
		const description = response.data.choices[0].message.content
		res.status(200).json({ description })
	} catch (error) {
		console.error(
			'Error fetching player description:',
			error.response ? error.response.data : error.message
		)
		res.status(500).json({ error: error.message })
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
