import React, { useEffect, useState } from 'react'
import { getPlayers, editPlayer, getPlayerDescription } from './api/api'

import './App.css'

const App = () => {
	const [players, setPlayers] = useState([])
	const [selectedPlayer, setSelectedPlayer] = useState(null)
	const [playerDescription, setPlayerDescription] = useState('')
	const [isEditing, setIsEditing] = useState(null)	

	useEffect(() => {
		async function fetchPlayers() {
			const data = await getPlayers()
			setPlayers(data)
		}
		fetchPlayers()
	}, [])

	const handlePlayerClick = async (player) => {
		if (selectedPlayer && selectedPlayer.id === player.id) {
			setSelectedPlayer(null)
			setPlayerDescription('')
			return
		}
		setSelectedPlayer(player)
		handlePlayerDescription(player.name)
	}

	const handlePlayerDescription = async (name) => {
		setPlayerDescription('Loading player description...')
		const description = await getPlayerDescription(name)
		setPlayerDescription(description)
	}

	const handleSaveClick = async (id) => {
		const playerToSave = players.find((player) => player.id === id)
		await editPlayer(id, playerToSave)
		setIsEditing(null)
	}

	const handleChange = (e, id, field) => {
		const value =
			field === 'hits' || field === 'rank'
				? parseInt(e.target.value)
				: e.target.value
		const updatedPlayers = players.map((player) =>
			player.id === id ? { ...player, [field]: value } : player
		)
		setPlayers(updatedPlayers)
	}

	return (
		<div className='main-page'>
			<h1>Major League Baseball - Career Hits</h1>
			<table className='player-table'>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Name</th>
						<th>Hits</th>
						<th>Throws</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player) => (
						<React.Fragment key={player.id}>
							<tr>
								<td>{player.rank}</td>
								<td
									onClick={() => handlePlayerClick(player)}
									className='player-name'
								>
									{player.name}
								</td>
								<td>
									{isEditing === player.id ? (
										<input
											type='number'
											value={player.hits}
											onChange={(e) => handleChange(e, player.id, 'hits')}
										/>
									) : (
										player.hits
									)}
								</td>
								<td>
									{isEditing === player.id ? (
										<input
											type='text'
											value={player.throws}
											onChange={(e) => handleChange(e, player.id, 'throws')}
										/>
									) : (
										player.throws
									)}
								</td>
								<td>
									{isEditing === player.id ? (
										<button onClick={() => handleSaveClick(player.id)}>
											Save
										</button>
									) : (
										<button onClick={() => setIsEditing(player.id)}>
											Edit
										</button>
									)}
								</td>
							</tr>
							{selectedPlayer && selectedPlayer.id === player.id && (
								<tr className='description-row'>
									<td colSpan='5'>
										<div className='player-description'>
											<h2>{selectedPlayer.name}</h2>
											<p>{playerDescription}</p>
											<button onClick={() => setSelectedPlayer(null)}>
												Close
											</button>
										</div>
									</td>
								</tr>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default App
