const http = require('http');
const path = require('path');
const fs = require('fs')
const socketio = require('socket.io')
const launch = require('./src/app')

const PORT = process.env.PORT || 8080


const error404 = (_, res) => {
	res.statusCode = 404
	res.end("Error 404")
}

const sendFile = (req, res) => {
	const file_path = path.normalize('.' + '/public/' + (req.url === '/' ? 'index.html' : req.url)) // __dirname not working in the www folder
	fs.access(file_path, fs.R_OK, err => {
		if (!!err || !fs.lstatSync(file_path).isFile()) return error404(req, res)
		const fileReadStrim = fs.createReadStream(file_path);
		fileReadStrim.pipe(res)
	})
}

const handler = (req, res) => {
	return sendFile(req, res)
};

const server = http.createServer(handler);

const io = socketio(server)

io.on('connection', socket => {
	launch(socket, io);
	socket.emit('message', { msg: 'hello from the server' })
	socket.on('message', console.log)
})

server.listen(PORT);
console.log(`Web server listen on localhost:${PORT} ...`);