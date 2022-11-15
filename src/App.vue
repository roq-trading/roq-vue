<script setup>
import axios from "axios"
import dayjs from "dayjs"
</script>

<script>
export default {
	data() {
		return { 
			gateways: [ "deribit", "ftx" ],
			gateway: null,
			exchanges: [],
			exchange: null,
			symbols: [],
			symbol: null,
			reference_data: {},
			top_of_book: {},
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
		fetch_reference_data() { 
			axios
				.get(`http://localhost:1234/reference_data/${this.exchange}/${this.symbol}`)
				.then(response => (this.reference_data = response.data))
		},
		fetch_top_of_book() { 
			axios
				.get(`http://localhost:1234/top_of_book/${this.exchange}/${this.symbol}`)
				.then(response => {this.top_of_book = response.data;
							      setTimeout(() => this.fetch_top_of_book(), 5000)
						  }) 
		},
	},
	watch: {
		gateway(a,b) { this.fetch_exchanges() },
		exchange(a,b) { this.fetch_symbols() },
		symbol(a,b) { this.fetch_reference_data(); this.fetch_top_of_book(); },
	},
	created() {
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
	<div v-if="Object.keys(top_of_book).length>0">
	<div>{{ top_of_book.exchange }} / {{ top_of_book.symbol }}</div>
	<div>{{ top_of_book.layer.bid_price }} x {{ top_of_book.layer.ask_price }}</div>
	<div>{{ format_time(top_of_book.exchange_time_utc) }}</div>
	<div>{{ format_date(top_of_book.exchange_time_utc) }}</div>
	</div>
	<div v-if="Object.keys(reference_data).length>0">{{ reference_data }}</div>
</template>

<style scoped>
button { 
font-weight: bold; 
}
</style>
