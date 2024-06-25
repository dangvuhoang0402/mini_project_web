const TemperatureService = require('../services/TemperatureService')

const getAllTemperature = async (req, res, next) => {
    const temperatures = await TemperatureService.getAllTemperature()
    req.responseData = {
        status: 200, 
        message: 'Success', 
        data: temperatures 
    };
    next();
}

const viewTemperatureList= async (req, res, next) => {
    const temperature_list= await TemperatureService.getAllTemperature()
    res.render('temperature_list', { title: 'Temperature List',temperature_list:temperature_list });
}

const getTemperaturebyId = async (req, res, next) => {
    const temperature = await TemperatureService.getTemperatureById(req.params.id)
    req.responseData = {
        status: 200, 
        message: 'Success', 
        data: temperature 
    };
    next();
}

const updateTemperature = async (req, res, next) => {
    const updatedTemperature = await TemperatureService.updateTemperature(req.params.id, req.body)
    req.responseData = {
        status: 200, 
        message: 'Success', 
        data: updatedTemperature 
    };
    next();
}

const deleteTemperature = async (req, res, next) => {
    await TemperatureService.deleteTemperature(req.params.id)
    req.responseData = {
        status: 200, 
        message: 'Success', 
        data: null 
    };
    next();
}

const createTemperature = async (req, res, next) => {
    const temperature = await TemperatureService.createTemperature(req.body)
    req.responseData = {
        status: 201, 
        message: 'Success', 
        data: temperature 
    };
    next();
}

module.exports = {
    getAllTemperature,
    getTemperaturebyId,
    updateTemperature,
    deleteTemperature,
    createTemperature,
    viewTemperatureList
}