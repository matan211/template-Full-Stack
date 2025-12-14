const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    Car_name: { type: String, required: true },
    Efficiency: { type: Number },
    Fast_charge: { type: Number },
    Price: { type: Number },
    Range: { type: Number },
    Top_speed: { type: Number },
    Acceleration: { type: Number }
}, { 
    collection: 'cars', // Force connection to your existing collection
    versionKey: false   // Don't add __v field
});

// Helper: Rename _id to id for frontend convenience
carSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

module.exports = mongoose.model('Car', carSchema);