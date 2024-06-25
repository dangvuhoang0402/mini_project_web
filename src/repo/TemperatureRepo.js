const Temperature = require("../models/Temperature");
require("express-async-errors");
const {notifyClients} = require('../config/ws.config');

const createTemperature = async (temperatureData) => {
    console.log("TemperatureRepo:CreateTemperature");
    temperatureData.Date = new Date(Date.now());
    const newTemperature = await Temperature.create(temperatureData);
    notifyClients(JSON.stringify({ event: 'newTemperature', data: newTemperature }));
    return newTemperature;
};

const getAllTemperature = async () => {
    console.log("TemperatureRepo:getAllTemperature");
    const allTemperatures = await Temperature.find();
    return allTemperatures;
};

const getTemperatureById = async (id) => {
    console.log("TemperatureRepo:getTemperatureById");
    const temperature = await Temperature.findById(id);
    if (!temperature) {
        throw new Error("Temperature not found");
    }
    return temperature;
};

const updateTemperature = async (id, updatedData) => {
    console.log("TemperatureRepo:updateTemperature");
    const updatedTemperature = await Temperature.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    return updatedTemperature;
};

const deleteTemperature = async (id) => {
    console.log("TemperatureRepo:deleteTemperature");
    await Temperature.findByIdAndDelete(id);
};

module.exports = {
    createTemperature,
    getAllTemperature,
    getTemperatureById,
    updateTemperature,
    deleteTemperature
}