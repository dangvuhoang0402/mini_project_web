const express = require('express');
var dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk')
const http = require('http');
const cors= require('cors')

const connectMongoDB = require('./src/config/database.config')
const connectMQTT = require('./src/config/mqtt.config')
const handleError = require('./src/middlewares/handleError');
const handleResponse  = require('./src/middlewares/handleResponse');
const {setupWebSocket}  = require('./src/config/ws.config');

const TemperatureRoute= require("./src/route/TemperatureRoute");

var env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

const customMorgan = (tokens, req, res) => {
    const time = chalk.yellow(tokens.date(req, res, 'clf'));
    const method = chalk.green(tokens.method(req, res));
    const url = chalk.green(tokens.url(req, res));
    const status = chalk.green(tokens.status(req, res));

    return `${time} Method:${method} Url:${url} status:${status} `;
};

app.use(morgan(customMorgan));
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

app.use(handleError)
app.use("/temperature",TemperatureRoute,handleResponse)

const brokerUrl = process.env.Broker_URL
const options = {
  username: process.env.FLESPI_TOKEN
}
const topic= process.env.TOPIC
    
const start = async ()=>{
    try {
        await connectMongoDB(process.env.URL)
        console.log('brokerUrl',brokerUrl);
        console.log('options',options);
        await connectMQTT(brokerUrl,options,topic)
        await setupWebSocket(server);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}
start()

