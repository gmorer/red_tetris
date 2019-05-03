import React from 'react'

const parentStyle = {
	display: "flex",
	alignIitems: "center",
	justifyContent: "center"
}

const childStyle = {
	// textAlign: "left",
	// width: "150px",
	// display: "block",
	// float: "left",
	// clear: "right",
	// fontSize: "18",
}

const NameChooser = ({ setName }) => (
	<div style={parentStyle} >
		<div style={{ maxWidth: "50%" }} />
		<div style={{ maxWidth: "50%" }}>
			<input style={childStyle} placeholder="Enter your Name" />
			<button style={childStyle}>
				OK
		</button>
		</div>
		<div style={{ maxWidth: "50%" }} />
	</div>
)

export default NameChooser