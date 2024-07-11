const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    ecg: [Number],
    heartRate: Number,
    spo2: Number,
    timestamp: { type: Date, default: Date.now },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
