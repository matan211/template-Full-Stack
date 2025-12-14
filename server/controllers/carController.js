const carService = require('../services/carService');

// Async because we are using await to wait for the database to return the data
exports.getCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addCar = async (req, res) => {
    try {
        const newCar = await carService.createNewCar(req.body);
        res.status(201).json(newCar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        // Params is like 
        const updatedCar = await carService.updateCarById(req.params.id, req.body);
        res.json(updatedCar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await carService.deleteCarById(req.params.id);
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopFastestCars = async (req, res) => {
    try {
        const cars = await carService.getTopFastestCars();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};