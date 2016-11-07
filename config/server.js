const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const PORT = process.env.PORT || 5001;

function handler(req, res) {
  res.writeHead(200)
  res.end();
}

module.exports = {
  emitRefresh() {
    io.emit("update");
  }
}

app.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
});
