module.exports.handleSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
