const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    Temperature: {
        type: Number,
        required: true
    },
    Humidity: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
