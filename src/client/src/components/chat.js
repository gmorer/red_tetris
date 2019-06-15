import React from "react"

const mainStyle = {
	height: "100%",
	width: "50%"
}

const anotherStyle = {
	overflowY: "auto",
	height: "100%",
	padding: "1em",
	textAlign: "justify",
	backgroundColor: "grey"
}

const inputStyle = {
	// height: "4.5%",
	// width: "80%",
	// borderRadius: "6px",
	border: "2px solid #5E5E5E",
	height: "2em",
	width: "80%",
	backgroundColor: "transparent",
	paddingLeft: "1em"
}

const buttonStyle = {
	// width: "40%",
	// height: "3%",
	// height: "2em",
	color: "white",
	border: "none",
	borderRadius: "0px",
	backgroundColor: "#5E5E5E",
	width: "20%",
}

const msgStyle = {
	// backgroundColor: "black",
	// color: "white",
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
			<p style={{fontWeight: "bold", fontStyle: "italic"}}>
				{e.msg}
			</p>
		}
</div>
)

const Chat = ({ messages, socket }) => (
	<div style={mainStyle}>
		<div style={anotherStyle}>
		{	messages.map(Entry) }
		</div>
		<form onSubmit={sendMessage(socket)} style={{display: "flex", background: "grey"}}>
			<input style={inputStyle} placeholder="Your message" id="msg" />
			<button style={buttonStyle} onClick={sendMessage(socket)}>Send</button>
		</form>
	</div >
)

export default Chat