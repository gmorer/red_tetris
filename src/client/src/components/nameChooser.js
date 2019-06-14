import React from 'react'

const parentStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	textAlign: "center",
	backgroundImage: "url('bg2.jpg')",
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat",
	width: "100%"

}

const inputStyle = {
	width: "100%",
	border: "2px solid black",
	padding: "12px 20px",
	boxSizing: "border-box",
	borderRadius: "25px",
}

const buttonStyle = {
	backgroundColor: "#9f233a",
	color: "white",
	marginTop: "1em",
	border: "2px solid white",
	cursor: "pointer",
	height: "3em",
	width: "15em",
	textDecoration: "none",
	borderRadius: "8px",

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