# roq-vue

EXPERIMENT

Install dependencies

```bash
npm i
```

Your gateway configuration

```bash
--service_listen_address 1234
--url_prefix roq
```

... should match what you define in `.env.development`

```bash
VITE_ROQ_URL=http://localhost:1234/roq
```

Then compile this project and enable a local end-point

```bash
npm run dev
```

![Home](/doc/images/home.png)
![Strategy1](/doc/images/strategy_1.png)
![Strategy2](/doc/images/strategy_2.png)
![Public1](/doc/images/public_1.png)
![Public2](/doc/images/public_2.png)
![Private1](/doc/images/private_1.png)
![Private2](/doc/images/private_2.png)
![Status](/doc/images/status.png)
