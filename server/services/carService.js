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

exports.getTopFastestCars = async () => {
    return await Car.find({ Efficiency: { $gt: 170 } })
        // Sort the cars by top speed in descending order
        .sort({ Top_speed: -1 })
        .limit(10);
};