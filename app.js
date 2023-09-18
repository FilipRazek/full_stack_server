const http = require('http');

const PORT = 3000;

const server = http.createServer(function (req, res) {
	res.write("On my way to full-stack!");
	res.end();
}).listen(PORT, () => console.log(`Listening on port ${PORT}`));


