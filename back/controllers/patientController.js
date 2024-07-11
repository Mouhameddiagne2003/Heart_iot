const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updatePatientById = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deletePatientById = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPatientMedicalData = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('medicalData');
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient.medicalData);
    } catch (error) {
        res.status(500).send(error);
    }
};
