const Car = require('../models/Car');

exports.getAllCars = async () => {
    return await Car.find();
};

exports.createNewCar = async (carData) => {
    const car = new Car(carData);
    return await car.save();
};

exports.updateCarById = async (id, updates) => {
    // { new: true } returns the updated document instead of the old one
    return await Car.findByIdAndUpdate(id, updates, { new: true });
};

exports.deleteCarById = async (id) => {
    return await Car.findByIdAndDelete(id);
};