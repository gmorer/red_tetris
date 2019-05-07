import React from "react"

const mainStyle = {
	backgroundColor: "grey",
	width: "50%"
	// height: "20px"
}

const sendMessage = (socket, gameName) => () => {
	let msg = document.getElementById("msg").value.trim();
	if (msg === "")
		return console.log('votre message est vide')
	else {
		socket.emit("newMessage", { msg: msg, gameName: gameName })
	}

}

const messages = [{ user: "toto", msg: "ready" }, { user: "tata", msg: "ready" }, { user: "titi", msg: "ready" }]

const Chat = ({ message, socket, gameName }) => (
	<div style={mainStyle}>
		{gameName}
		{messages.map((e, index) => (
			<div key={index}>
				<p > {e.user}</p>
				<p > {e.msg}</p>
			</div>
		)
		)
		}

		<input placeholder="Your message" id="msg" />
		<button onClick={sendMessage(socket, gameName)}>Send</button>

	</div >
)

export default Chat