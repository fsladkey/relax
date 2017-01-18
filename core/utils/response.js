module.exports = function HTTPResponse(res) {
  res.render = function(arg) {
    let content
    if (typeof arg === 'string') {
      // TODO: Check content type
      this.setHeader('Content-Type', 'text/html');
      content = arg
    } else if (arg.json) {
      this.setHeader('Content-Type', 'application/json');
      content = JSON.stringify(arg.json)
    } else if (arg.html) {
      this.setHeader('Content-Type', 'text/html');
      content = arg.html
    }
      this.statusCode = arg.status || 200
      this.write(content)
      this.end()
  }
  return res
}
