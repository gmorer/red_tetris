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

	const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
	const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
	const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

	return "#" + RR + GG + BB;
}

const style = (color, height, width) => ({
	height: height,
	width: width,
	border: `2px solid ${shadeColor(color, -40)}`,
	boxSizing: "border-box",
})

const insideStyle = (color) => ({
	width: "0px",
	height: "0px",
	borderStyle: "solid",
	borderColor: `${color} red red ${shadeColor(color, 20)}`,
	borderWidth: "10em 0em 0em 10em"

})


const Block = ({ color, height, width }) => (
	<div style={style(color, height, width)}>
		<div style={{overflow: "hidden", height: "100%", width: "100%"}}>
		<div style={insideStyle(color)}></div>
		</div>
	</div >
)

export default Block