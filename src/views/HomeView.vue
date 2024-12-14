<script setup>
import { ref } from 'vue';
import Systemd from "@/components/Systemd.vue";
import Package from "@/components/Package.vue";
import Host from "@/components/Host.vue";
import socket from "@/socket.js"
</script>

<script>
export default {
  data() {
    return {
      shared: {
        socket: socket,
        request: false,
	      services: null,
      },
      view: 'systemd',
    };
  },
  methods: {
	  bind_socket() {
      socket.onopen = this.on_open;
      socket.onclose = this.on_close;
      socket.onmessage = this.on_message;
    },
    on_open(event) {
      console.log('open');
      this.shared.request = false;  // XXX
      var request = [
        'subscribe',
        'services',
      ];
      var message = JSON.stringify(request);
      console.log(message);
      event.target.send(message);
    },
    on_close(event) {
      console.log('close');
      this.shared.request = true;  // XXX
      // XXX FIXME auto-reconnect
    },
    on_message(event) {
      console.log(event.data);
		  var message = JSON.parse(event.data);
		  console.log(message);
      var method = message[0];
      if (method == 'subscribe') {
        console.log('subscribe: ', message[2]);
      } else if (method == 'unsubscribe') {
        console.log('unsubscribe: ', message[2]);
      } else if (method == 'snapshot') {
        console.log('snapshot: ', message[2]);
        this.shared.services = message[2];
      } else if (method == 'update') {
        console.log('update: ', message[2]);
        // XXX FIXME doesn't work -- use transactions on the grid instead
        var name = message[2].name;
        for (var i = 0; i < this.shared.services.length; i++) {
          if (this.shared.services[i].name == name) {
            this.shared.services[i] = message[2];
            return;
          }
        }
      } else if (method == 'control') {
        console.log('control: ', message[2]);
        this.shared.request = false;
      }
	  },
  },
  mounted() {
    this.bind_socket();
  },
  unmouned() {
    console.log('unmouned');
    var request = [
      'unsubscribe',
      'services',
    ];
    var message = JSON.stringify(request);
    console.log(message);
    event.target.send(message);
  },
};
</script>

<template>
  <div class="title">
    <h2>Services</h2>
    <hr />
  </div>
  <div class="container">
    <div class="view">
      <button @click="view='systemd'">systemd</button>
      <button @click="view='package'">package</button>
      <button @click="view='host'">host</button>
      <div v-if="view=='systemd'">
        <Systemd :shared="shared" />
      </div>
      <div v-if="view=='package'">
        <Package :shared="shared" />
      </div>
      <div v-if="view=='host'">
        <Host :shared="shared" />
      </div>
    </div>
    <div class="view"></div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
}
.title {
  width: 100%;
  text-align: center;
}
hr {
  width: 30%;
  margin: auto;
  border-width: 0;
  border-top: 1px solid #f0af0d;
  padding-bottom: 3em;
}
td {
  padding: 0 0.5em 0 0.5em;
}
td:nth-child(1) {
  color: #f0af0d;
}
button {
  border: 1px solid #7f0102;
  background: black;
  font-size: 1.2em;
}
button a {
  color: #f0af0d;
}
button:hover {
  background: #7f0102;
}
button:hover a {
  color: white;
}
</style>
