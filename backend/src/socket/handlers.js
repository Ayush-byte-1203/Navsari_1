exports.setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected (placeholder handler)');
    socket.on('disconnect', () => {
      console.log('A user disconnected (placeholder handler)');
    });
  });
}; 