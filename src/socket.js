function create_ws_url() {
  const protocol = window.location.protocol == 'https' ? 'wss' : 'ws';
  const hostname = window.location.hostname;
  const port = window.location.port;
  const result = protocol + '://' + hostname + ':' + port + '/roq/';
  console.log(result);
  return result;
}

const socket = new WebSocket(create_ws_url());

socket.onerror = function(event) {
  console.log('error: ', event);
};

export default socket;
