const mqtt = require('mqtt')
const TemperatureRepo= require("../repo/TemperatureRepo");

const connectMQTT = (brokerUrl, options, topic) => {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect(brokerUrl, options)

        client.on('connect', function () {
            console.log('Connected to MQTT broker')
            client.subscribe(topic, function (err) {
                if (!err) {
                    console.log(`Subscribed to topic: ${topic}`)
                    resolve(client)
                } else {
                    console.error(`Failed to subscribe to topic: ${topic}`, err)
                    reject(err)
                }
            })
        })

        client.on('message', function (topic, message) {
            console.log(`Received message on topic ${topic}: ${message.toString()}`)
            const temperatureData = JSON.parse(message.toString())
            TemperatureRepo.createTemperature(temperatureData)
        })

        client.on('error', function (err) {
            console.error('Failed to connect to MQTT broker:', err)
            reject(err)
        })
    })
}

module.exports = connectMQTT