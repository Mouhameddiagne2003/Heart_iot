const mongoose = require('mongoose');

const MedecinSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    speciality: String,
    hopital: String,
    address: String,
    contact: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

module.exports = mongoose.model('Medecin', MedecinSchema);
