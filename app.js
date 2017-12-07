/**
 * Created by songdahye on 2017. 12. 4..
 */
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

// 소켓서버를 웹서버에 연결합니다
io.attach(server);

app.use(express.static(`${__dirname}/public`));


io.sockets.on('connection', (socket) => {
	socket.on('message', (data) => {
		io.sockets.emit('message', data);
	});
});

const port = process.env.PORT || 4001;
server.listen(port, () => {
	console.log('Server Running...');
	var port = server.address().port;
	console.log("Express is working on port " + port);
});