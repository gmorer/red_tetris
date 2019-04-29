import React from 'react'

const shadeColor = (color, percent) => {

	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);

	R = parseInt(R * (100 + percent) / 100);
	G = parseInt(G * (100 + percent) / 100);
	B = parseInt(B * (100 + percent) / 100);

	R = (R < 255) ? R : 255;
	G = (G < 255) ? G : 255;
	B = (B < 255) ? B : 255;

	let RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
	let GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
	let BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

	return "#" + RR + GG + BB;
}

const style = (color, height, width) => ({
	height: height,
	width: width,
	border: `2px solid ${shadeColor(color, -40)}`,
	boxSizing: "border-box",
	// backgroundColor: color
})

const Block = ({ color, height, width }) => (
	<div style={style(color, height, width)}>
		{console.log(color)}
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
			viewBox="0 0 64 64" style={{ enableBackground: "new 0 0 496 496", height: "100%", width: "100%" }} >
			<rect x="0" y="0" style={{ fill: color }} width="64" height="64" />
			<polyline style={{ fill: shadeColor(color, 40) }} points="0,0 64,0 64,64 " />
		</svg>
	</div >
)

export default Block