import React from "react"

const mainStyle = {
	background: "linear-gradient(to bottom right, #9f233a, white)",
	borderRadius: "10px",
	opacity: "0.8",
	width: "25%",
}

const anotherStyle = {
	overflowY: "auto",
	height: "100%",
	padding: "1em",
	textAlign: "justify",
	background: "linear-gradient(to bottom right, #9f233a, white)",
	backgroundColor: "#9f233a"
}

const inputStyle = {
	color: "black",
	border: "2px solid #5E5E5E",
	height: "2em",
	width: "80%",
	backgroundColor: "transparent",
	paddingLeft: "1em"
}

const buttonStyle = {
	color: "white",
	border: "none",
	borderRadius: "0px",
	backgroundColor: "#9f233a",
	width: "20%",
}

const msgStyle = {
	width: "80%",
	height: "10%",
	borderRadius: "5px"
}

const sendMessage = (socket) => e => {
	let msg = document.getElementById("msg").value.trim();
	if (!!msg) {
		socket.emit("newMessage", msg)
		document.getElementById("msg").value = "";
	}
	e.preventDefault();
}

const Entry = (e, index) => (
	<div key={index}>
		{
			!!e.name ?
				<p>
					<b>{e.name} :</b>
					<span style={msgStyle}> {e.msg}</span>
				</p> :
				<p style={{ fontWeight: "bold", fontStyle: "italic" }}>
					{e.msg}
				</p>
		}
	</div>
)

const Chat = ({ messages, socket }) => (
	<div style={mainStyle}>
		<p>Chat++ </p>
		<div style={anotherStyle}>
			{messages.map(Entry)}
		</div>
		<form onSubmit={sendMessage(socket)} style={{ display: "flex", background: "white" }}>
			<input style={inputStyle} placeholder="Your message" id="msg" />
			<button style={buttonStyle} onClick={sendMessage(socket)}>Send</button>
		</form>
	</div >
)

export default Chat