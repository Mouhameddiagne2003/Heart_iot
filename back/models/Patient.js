const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    prenom: String,
    nom: String,
    age: Number,
    address: String,
    sex: String,
    contact: String,
    healthStatus: String,
    medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin' },
    medicalData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorData' }],
    sensors: [String]
});

module.exports = mongoose.model('Patient', PatientSchema);
