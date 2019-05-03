import React, { useState } from 'react'
import NameChooser from '../components/nameChooser'

const GameChoser = ({ state, setState }) => {
	const [userId, setUserId] = useState(null);
	if (!userId) return <NameChooser />
}

export default GameChoser