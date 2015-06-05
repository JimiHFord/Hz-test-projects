// this is a cool trick that allows you to inject
// outside objects into the scope of this file
// by setting "module.exports" equal to a function,
// you are requiring some other part of the app to
// run this function, passing in whatever parameters
// you need to into this scope

// io is the socket.io instance that has already been
// connected via middleware to our express app
module.exports = function(io) {

  var usernames = {};
  var numUsers = 0;

  io.on('connection', function(socket) {
    console.log('connection established');
    var helper = require('./helper');
    socket.guid = helper.guid();
    console.log(socket.guid);
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

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    var addedUser = false;
    console.log('multiple connection calls');
    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
      // we store the username in the socket session for this client
      socket.username = username;
      // add the client's username to the global list
      usernames[username] = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      // remove the username from global usernames list
      if (addedUser) {
        delete usernames[socket.username];
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });
}
