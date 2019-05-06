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
	borderRadius: "4px",
}

const clickHandler = setName => e => {
	let name = document.getElementById("name_input").value.trim()
	if (!!name) setName(name)
	e.preventDefault();
}

const NameChooser = ({ setName }) => (
	<div style={parentStyle} >
		{/* <div style={{ maxWidth: "50%" }} /> */}
		<form onSubmit={clickHandler(setName)}>
			<input id="name_input" style={inputStyle} placeholder="Enter your Name" autoFocus={true} />
			<button style={buttonStyle} onClick={clickHandler(setName)}>
				OK
		</button>
		</form>
		{/* <div style={{ maxWidth: "50%" }} /> */}
	</div>
)

export default NameChooser