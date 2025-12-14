const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Define routes and map them to controller functions

// GET all cars
router.get('/', carController.getCars);

// POST create a new car
router.post('/', carController.addCar);

// PUT update a car by ID
router.put('/:id', carController.updateCar);

// DELETE remove a car by ID
router.delete('/:id', carController.deleteCar);

// GET top 10 fastest cars by top_speed with Efficiency above 170
router.get('/top-fastest', carController.getTopFastestCars);

module.exports = router;

