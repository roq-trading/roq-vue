<script setup>
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import { create_url } from "@/components/Utils";
defineProps({
  gateway: {
    type: String,
    required: false,
  },
  exchange: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  timer: {
    type: Date,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      top_of_book: null,
    };
  },
  methods: {
    format_datetime(obj) {
      if (_.isNil(obj)) return;
      const date = dayjs(obj);
      return date.format("YYYY-MM-DD hh:mm:ss");
    },
    fetch_top_of_book() {
      const path = `/api/top_of_book?exchange=${this.exchange}&symbol=${this.symbol}`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.top_of_book = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.top_of_book = null;
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    },
  },
  watch: {
    symbol() {
      this.fetch_top_of_book();
    },
    timer() {
      this.fetch_top_of_book();
    },
  },
  mounted: function () {
    this.fetch_top_of_book();
  },
};
</script>

<template>
  <div class="container">
    <h3>Top of Book</h3>
    <div v-if="top_of_book">
      <table>
        <tr>
          <td class="bid" colspan="2">Bid</td>
          <td class="ask" colspan="2">Ask</td>
        </tr>
        <tr>
          <td class="bid" style="width: 25%">
            {{ top_of_book.layer.bid_quantity }}
          </td>
          <td class="bid" style="width: 25%">
            {{ top_of_book.layer.bid_price }}
          </td>
          <td class="ask" style="width: 25%">
            {{ top_of_book.layer.ask_price }}
          </td>
          <td class="ask" style="width: 25%">
            {{ top_of_book.layer.ask_quantity }}
          </td>
        </tr>
      </table>
      <div v-if="top_of_book.exchange_time_utc">
        Exchange time:
        {{ format_datetime(top_of_book.exchange_time_utc) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
  background-color: black;
}
table {
  width: 100%;
  background-color: black;
}
td {
  padding: 0 0.5em 0 0.5em;
  text-align: center;
  color: black;
}
.bid {
  background-color: lightblue;
}
.ask {
  background-color: pink;
}
</style>
