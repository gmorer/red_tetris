import React from 'react'

const parentStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	textAlign: "center",
	backgroundColor: "blue"
}

const inputStyle = {
	width: "100%",
	border: "none",
	padding: "12px 20px",
	boxSizing: "border-box",
	borderRadius: "25px"
}

const buttonStyle = {
	backgroundColor: "green",
	marginTop: "1em",
	border: "none",
	cursor: "pointer",
	height: "2em",
	width: "6em",
	textDecoration: "none",
	borderRadius: "4px"

}

const clickHandler = setName => _ => {
	let name = document.getElementById("name_input").value.trim()
	if (!!name) setName(name)
}

const NameChooser = ({ setName }) => (
	<div style={parentStyle} >
		{/* <div style={{ maxWidth: "50%" }} /> */}
		<div>
			<input id="name_input" style={inputStyle} placeholder="Enter your Name" />
			<button style={buttonStyle} onClick={clickHandler(setName)}>
				OK
		</button>
		</div>
		{/* <div style={{ maxWidth: "50%" }} /> */}
	</div>
)

export default NameChooser