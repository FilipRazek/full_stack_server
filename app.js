const http = require('http');

const PORT = 3000;

const server = http.createServer(function (req, res) {
	res.write("Edited by the outside world!");
	res.end();
}).listen(PORT, () => console.log(`Listening on port ${PORT}`));


