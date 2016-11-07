const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')

window.resetApp = function() {
  const App = require('./components/app')
  const root = document.querySelector("#react-content")
  ReactDOM.render(React.createElement(App), root)
  showImageTag(() => setTimeout(hideImageTag, 300));
}

function reloadJS() {
  const oldLink = document.getElementsByTagName("script")[0];
  const newLink = document.createElement("script");
  newLink.onload = () => resetApp();
  newLink.setAttribute("src", oldLink.src);
  document.querySelector("body").replaceChild(newLink, oldLink);
}

function reloadCSS() {
  const head = document.querySelector("head");
  const oldLink = document.getElementsByTagName("link")[0];
  const newLink = document.createElement("link");
  newLink.setAttribute("rel", "stylesheet");
  newLink.setAttribute("type", "text/css");
  newLink.onload = () => head.removeChild(oldLink);
  newLink.setAttribute("href", oldLink.href);
  head.appendChild(newLink, oldLink);
}

function createImageTag() {
  window.imgTag = document.createElement('img');
  imgTag.src = 'statics/images/webpack_logo.gif';
  imgTag.style.position = 'fixed';
  imgTag.style.height = '30px';
  imgTag.style.width = '30px';
  imgTag.style.top = '30px';
  imgTag.style.right = '30px';
  imgTag.style.opacity = 0;
  document.querySelector('body').appendChild(imgTag);
}

function showImageTag(cb) {
  if (imgTag.style.opacity >= 1) {
    imgTag.style.opacity = 1;
    cb();
  } else {
    imgTag.style.opacity = parseFloat(imgTag.style.opacity) + 0.1;
    setTimeout(() => showImageTag(cb), 10);
  }
}

function hideImageTag() {
  if (imgTag.style.opacity <= 0) {
    imgTag.style.opacity = 0;
  } else {
    imgTag.style.opacity = parseFloat(imgTag.style.opacity) - 0.05;
    setTimeout(() => hideImageTag(), 35);
  }
};

 function hotReload() {
  reloadCSS();
  reloadJS();
}



if (!window.connected) {
  const socket = io.connect('http://localhost:5001');
  socket.on('update', () => {
    console.log("reloading...");
    hotReload()
  });
  window.connected = true
  createImageTag();
  hotReload()
}
