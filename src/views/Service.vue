<script setup>
import StreamStatus from "@/components/StreamStatus.vue";
import ReferenceData from "@/components/ReferenceData.vue";
import MarketStatus from "@/components/MarketStatus.vue";
import CustomMetrics from "@/components/CustomMetrics.vue";
import Parameters from "@/components/Parameters.vue";
import Session from "@/components/Session.vue";
import { shared, subscribe, unsubscribe } from "@/socket";
defineProps({
  name: {
    type: String,
    required: false,
  },
});
</script>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log('mounted');
    subscribe(this.name); // XXX FIXME there is a race with the grid rendering
  },
  unmounted() {
    console.log('unmounted');
    unsubscribe(this.name);
  },
};
</script>

<template>
  <div class="title">
    <h2>{{ name }}</h2>
    <hr />
  </div>
  <div class="container">
    <div class="view">
      <Parameters :shared="shared" />
    </div>
    <div class="view">
      <CustomMetrics :shared="shared" />
    </div>
    <div class="view">
      <MarketStatus :shared="shared" />
    </div>
    <div class="view">
      <ReferenceData :shared="shared" />
    </div>
    <div class="view">
      <StreamStatus :shared="shared" />
    </div>
    <div class="view">
      <Session :shared="shared" />
    </div>
  </div>
</template>

<style scoped>
select {
  padding: 0.1em 0.5em 0.1em 0.5em;
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

.context {
  padding-bottom: 2em;
  display: flex;
  gap: 2em;
}
.selector {
  vertical-align: text-top;
}
.market {
  display: grid;
  grid-template-columns: 50% 50%;
}
.object {
}
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
}
</style>
