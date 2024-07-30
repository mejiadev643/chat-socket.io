// refreshUsers.js
function refreshUsers(socket,io) {
    socket.on('refreshUsers', () => {
        // Lógica para manejar la acción de refrescar usuarios
        console.log('Usuarios refrescados');
        io.emit('refreshUsers');//se emite el evento refreshUsers
    });
}

module.exports = { refreshUsers };