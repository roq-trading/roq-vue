function create_ws_url() {
  if (typeof import.meta.env.VITE_ROQ_URL === 'undefined') {
    const protocol = window.location.protocol == 'https' ? 'wss' : 'ws';
    const hostname = window.location.hostname;
    const port = window.location.port;
    return protocol + '://' + hostname + ':' + port + '/roq/';
  } else {
    return `${import.meta.env.VITE_ROQ_URL}`;
  }
}

const socket = new WebSocket(create_ws_url());

socket.onerror = function(event) {
  console.log('error: ', event);
};

export default socket;
