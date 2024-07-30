const refreshUsers = require('./refreshUsers');

module.exports.handleSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
      io.emit('message', data);
    });
    refreshUsers(socket,io);//funcion que se encarga de refrescar los usuarios,s e pasa el socket para que pueda escuchar el evento refreshUsers

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
