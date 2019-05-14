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
	marginTop: "75em"
}

const buttonStyle = {
	// position: "relative",
	// bottom: "0",
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

const sendMessage = (socket, name, gameName) => () => {
	let msg = document.getElementById("msg").value.trim();
	// let name = document.getElementById("name").value;
	if (msg === "")
		return console.log('votre message est vide')
	else {

		socket.emit("newMessage", { msg, name, gameId: gameName })
		document.getElementById("msg").value = "";
	}

}

const messagdes = [{ user: "toto", msg: "ready" }, { user: "tata", msg: "ready" }, { user: "titi", msg: "ready" }]

const Chat = ({ messages, socket, gameName, name }) => (
	<div style={mainStyle}>
		{gameName}
		{/* {console.log("msgs: ", messages)} */}
		{
			messages.map((e, index) => (
				<div key={index}>
					<p > {e.name}</p>
					<div style={msgStyle}> {e.msg}</div>
				</div>
			)
			)
		}
		<input style={inputStyle} placeholder="Your message" id="msg" />
		<button style={buttonStyle} onClick={sendMessage(socket, name, gameName)}>Send</button>
	</div >
)

export default Chat