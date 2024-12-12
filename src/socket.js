const socket = new WebSocket('ws://localhost:2345/roq/');

socket.onerror = function(event) {
  console.log('error: ', event);
};

export default socket;
