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
		fs.createReadStream(file_path).pipe(res)
	})
}

const server = http.createServer(sendFile);

const io = socketio(server)

io.on('connection', socket => launch(socket, io))

server.listen(PORT);
console.log(`Web server listen on localhost:${PORT} ...`);