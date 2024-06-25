const CustomError = require("../error/CustomError");
const TemperatureRepo = require("../repo/TemperatureRepo");

require("express-async-errors");

const createTemperature = async (temperatureData) => {
    console.log("Temperature service: create temperature");
    const temperature = await TemperatureRepo.createTemperature(temperatureData);
    return temperature;
};

const getAllTemperature = async () => {
    console.log("Temperature service: get all temperatures");
    const temperatures = await TemperatureRepo.getAllTemperature();
    return temperatures;
};

const getTemperatureById = async (id) => {
    console.log("Temperature service: get temperature by id");
    const temperature = await TemperatureRepo.getTemperatureById(id);
    return temperature;
};

const updateTemperature = async (id, temperatureData) => {
    console.log("Temperature service: update temperature");
    const temperature = await TemperatureRepo.updateTemperature(id, temperatureData);
    return temperature;
};

const deleteTemperature = async (id) => {
    console.log("Temperature service: delete temperature");
    await TemperatureRepo.deleteTemperature(id);
};

module.exports = {
    createTemperature,
    getAllTemperature,
    getTemperatureById,
    updateTemperature,
    deleteTemperature
}