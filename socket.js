module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connection established');

    socket.on('magic', function(data) {
      console.log(data);
      io.emit('magic', data);
    });

    socket.on('disconnect', function() {
      console.log('connection terminated');
    });
  });
}
