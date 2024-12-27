# roq-vue

Front-end for Roq's service-manager.


Install dependencies

```bash
npm i
```

Define the service-manager end-point in `.env.development`

```bash
VITE_ROQ_URL=ws://localhost:2345/roq
```

Then compile this project and enable a local end-point for development

```bash
npm run dev
```

![services](/static/images/services.png)
![parameters](/static/images/parameters.png)
![streams](/static/images/streams.png)
![session](/static/images/session.png)


## License

The project is released under the terms of the MIT license.
