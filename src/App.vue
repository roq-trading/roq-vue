<script setup>
import axios from "axios"
import dayjs from "dayjs"
</script>

<script>
export default {
	data() {
		return { 
			data: {},
			gateways: [ "deribit", "ftx" ],
			gateway: null,
			exchanges: [],
			exchange: null,
			symbols: [],
			symbol: null
		}
	},
	methods: { 
		format_date(ds) {
			const d = dayjs(ds);
			return d.format('YYYY-MM-DD');
		},
		format_time(ds) {
			const d = dayjs(ds);
			return d.format('hh:mm:ss');
		},
		fetch_exchanges(value,ov) {
			axios
				.get('http://localhost:1234/top_of_book')
				.then(response => (this.exchanges = response.data))
		},
		fetch_symbols(value,ov) {
			axios
				.get(`http://localhost:1234/top_of_book/${this.exchange}`)
				.then(response => (this.symbols = response.data))
		},
		fetch_top_of_book() { 
			axios
				.get(`http://localhost:1234/top_of_book/${this.exchange}/${this.symbol}`)
				.then(response => {this.data = response.data;
							      setTimeout(() => this.fetch_top_of_book(), 1000)
						  }) 
		},
	},
	watch: {
		gateway(a,b) { this.fetch_exchanges() },
		exchange(a,b) { this.fetch_symbols() }
	},
	created() {
		this.fetch_top_of_book()
	},
	mounted() {
	}
}
</script>

<template>
	<div>
	<select v-model="gateway">
		<option v-for="gateway in gateways" :value="gateway">
			{{ gateway }}
		</option>
	</select>
	Gateway: {{ gateway }}
	<select v-model="exchange">
		<option v-for="exchange in exchanges" :value="exchange">
			{{ exchange }}
		</option>
	</select>
	Exchange: {{ exchange }}
	<select v-model="symbol">
		<option v-for="symbol in symbols" :value="symbol">
			{{ symbol }}
		</option>
	</select>
	Symbol: {{ symbol }}
	</div>
	<div v-if="Object.keys(data).length>0">
	<div>{{ data.exchange }} / {{ data.symbol }}</div>
	<div>{{ data.layer.bid_price }} x {{ data.layer.ask_price }}</div>
	<div>{{ format_time(data.exchange_time_utc) }}</div>
	<div>{{ format_date(data.exchange_time_utc) }}</div>
	</div>
</template>

<style scoped>
button { 
font-weight: bold; 
}
</style>
