import React from "react"

const mainStyle = {
	background: "linear-gradient(to bottom right, black, white)",
	borderRadius: "10px",
	width: "50%"
}

const inputStyle = {
	height: "4.5%",
	width: "80%",
	borderRadius: "6px",
	border: "2px solid black",
	marginTop: "2em"
}

const buttonStyle = {
	marginTop: "3em",
	width: "40%",
	height: "3%",
	color: "white",
	border: "2px solid black",
	borderRadius: "6px",
	backgroundColor: "black"
}

const msgStyle = {
	backgroundColor: "black",
	color: "white",
	width: "80%",
	height: "10%",
	borderRadius: "5px"
}

const sendMessage = (socket) => () => {
	let msg = document.getElementById("msg").value.trim();
	if (!!msg) {
		socket.emit("newMessage", msg)
		document.getElementById("msg").value = "";
	}
}

const Chat = ({ messages, socket }) => (
	<div style={mainStyle}>
		{
			messages.map((e, index) => (
				<div key={index}>
					<p > {e.name}</p>
					<div style={msgStyle}> {e.msg}</div>
				</div>
			))
		}
		<input style={inputStyle} placeholder="Your message" id="msg" />
		<button style={buttonStyle} onClick={sendMessage(socket)}>Send</button>
	</div >
)

export default Chat