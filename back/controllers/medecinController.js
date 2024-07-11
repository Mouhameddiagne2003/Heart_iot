const Medecin = require('../models/Medecin');

exports.createMedecin = async (req, res) => {
    try {
        const medecin = new Medecin(req.body);
        await medecin.save();
        res.status(201).send(medecin);
    } catch (error) {
        res.status(400).send(error);

    }
};

exports.getAllMedecins = async (req, res) => {
    try {
        const medecins = await Medecin.find();
        res.status(200).send(medecins);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getMedecinById = async (req, res) => {
    try {
        const medecin = await Medecin.findById(req.params.id);
        if (!medecin) {
            return res.status(404).send();
        }
        res.status(200).send(medecin);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateMedecinById = async (req, res) => {
    try {
        const medecin = await Medecin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!medecin) {
            return res.status(404).send();
        }
        res.status(200).send(medecin);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteMedecinById = async (req, res) => {
    try {
        const medecin = await Medecin.findByIdAndDelete(req.params.id);
        if (!medecin) {
            return res.status(404).send();
        }
        res.status(200).send(medecin);
    } catch (error) {
        res.status(500).send(error);
    }
};
