const http = require('http');
const path = require('path');
const fs = require('fs')
const Game = require('./src/classes/game')
const PORT = process.env.PORT || 8080

const mimes = {
	".html": "text/html",
	".css": "text/css",
	".ico": "image/x-icon",
	".js": "application/javascript",
	".jpg": "image/jpeg"
}

const error404 = (_, res) => {
	res.statusCode = 404
	res.setHeader("Content-Type", "plain/text");
	res.end("Error 404")
}

const sendFile = (req, res) => {
	const file_path = path.normalize('.' + '/public/' + (req.url === '/' ? 'index.html' : req.url)) // __dirname not working in the www folder
	fs.access(file_path, fs.R_OK, err => {
		if (!!err || !fs.lstatSync(file_path).isFile()) return error404(req, res)
		res.setHeader("Content-Type", mimes[path.extname(file_path)] || "plain/text");
		fs.createReadStream(file_path).pipe(res)
	})
}

const server = http.createServer(sendFile);

new Game(server)

server.listen(PORT);
console.log(`Web server listen on localhost:${PORT} ...`);
