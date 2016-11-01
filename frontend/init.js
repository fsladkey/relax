const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')

window.resetApp = function() {
  const App = require('./components/app')
  const root = document.querySelector("#react-content")
  ReactDOM.render(React.createElement(App), root)
}

function reloadJS() {
  var oldLink = document.getElementsByTagName("script")[0];
  var newLink = document.createElement("script");
  newLink.onload = () => resetApp();
  newLink.setAttribute("src", oldLink.src);
  document.querySelector("body").replaceChild(newLink, oldLink);
}

function reloadCSS() {
  var oldLink = document.getElementsByTagName("link")[0];
  var newLink = document.createElement("link");
  newLink.setAttribute("rel", "stylesheet");
  newLink.setAttribute("type", "text/css");
  newLink.setAttribute("href", oldLink.href);
  document.querySelector("head").replaceChild(newLink, oldLink);
}

 function hotReload() {
  reloadCSS();
  reloadJS();
}



if (!window.connected) {
  var socket = io.connect('http://localhost:5001');
  socket.on('update', () => {
    console.log("reloading...");
    hotReload()
  });
  window.connected = true
  hotReload()
}
