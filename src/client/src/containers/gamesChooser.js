import React, { useState } from 'react'
import NameChooser from '../components/nameChooser'
import ShowGames from '../components/showGames'

const GameChoser = ({ socket }) => {
	const [userId, setUserId] = useState(null);
	const [game, setGame] = useState(null);
	console.log(socket)
	if (!userId) return <NameChooser setName={setUserId} />
	else if (!game) return <ShowGames userId={userId} setUserId={setUserId} />

}

export default GameChoser