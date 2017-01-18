const handler = require('../core').handler
const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const PORT = process.env.PORT || 5001;

module.exports = {
  emitRefresh() {
    io.emit("update");
  },

  start() {
    app.listen(PORT, function () {
      console.log('Server listening at port %d', PORT);
    });
  }
}
