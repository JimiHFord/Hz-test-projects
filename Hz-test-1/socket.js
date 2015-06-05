// this is a cool trick that allows you to inject
// outside objects into the scope of this file
// by setting "module.exports" equal to a function,
// you are requiring some other part of the app to
// run this function, passing in whatever parameters
// you need to into this scope

// io is the socket.io instance that has already been
// connected via middleware to our express app
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connection established');

    // this first "magic" event is triggered by
    // the page called "Be The Magic"
    // the data from the event is passed through the
    // variable called data
    socket.on('magic', function(data) {
      console.log(data);

      // this will emit that same data out to every socket
      // on the same event name, "magic"
      // if we wanted to, we could call this event
      // "magic-detected"
      // that would just require us to change the code on
      // the page "See The Magic" to listen for events called
      // "magic-detected"
      io.emit('magic', data);

      // if we were to use the following code, only the
      // socket that triggered that magic event would get
      // an event back
      /*
        socket.emit('magic', data);
      */
      // if we were to use the following code, every socket
      // except for the current socket would get an event back
      /*
        socket.broadcast.emit('magic', data);
      */

    });

    socket.on('disconnect', function() {
      console.log('connection terminated');
    });
  });
}
