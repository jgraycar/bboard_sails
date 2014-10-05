(function (io) {
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    console.log("This is from the connect: ", this.socket.sessionid);

    socket.on('message', cometMessageReceivedFromServer);

    socket.get('/board/subscribe');
