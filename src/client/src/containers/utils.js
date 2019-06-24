export const IsItBlock = (piece, pos, tab) => {
	return piece.position[pos.rotation].display.some((row, y) => row.some((cube, x) => {
		if (y + pos.y - piece.position[pos.rotation].hitbox.bot >= 20) {
			return true
		}
		if (cube !== ' ')
			return tab[y + pos.y < 0 ? 0 : y + pos.y][x + pos.x] !== ' ';
		return false
	}))
}

export const getUpPos = (pos, piece, tab) => {
	for (let i = 0; ; i++) {
		if (pos.y + i - piece.position[pos.rotation].hitbox.bot >= 17 ||
			IsItBlock(piece, { y: pos.y + i, x: pos.x, rotation: pos.rotation }, tab)) {
			return ({ ...pos, y: pos.y + i - 1 })
		}
	}
}

export const getDownPos = (pos, piece, tab) => {
	for (let i = 0; ; i++) {
		if (pos.y + i - piece.position[pos.rotation].hitbox.bot >= 17 ||
			!IsItBlock(piece, { y: pos.y - i, x: pos.x, rotation: pos.rotation }, tab)) {
			return ({ ...pos, y: pos.y - i })
		}
	}
}

export const tabToPreview = tab => {
	const result = tab.map(y => y.map(x => x))
	result.forEach((line, y) =>
		line.forEach((_, x) => {
			if (y !== 0 && result[y - 1][x] !== ' ') result[y][x] = "black"
		}))
	return result;
}

export const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));