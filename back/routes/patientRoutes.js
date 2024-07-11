const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route pour créer un patient
router.post('/createpat', patientController.createPatient);

// Route pour obtenir tous les patients
router.get('/patients', patientController.getAllPatients);

// Route pour obtenir un patient par ID
router.get('/:id', patientController.getPatientById);

// Route pour mettre à jour un patient par ID
router.put('/:id', patientController.updatePatientById);

// Route pour supprimer un patient par ID
router.delete('/:id', patientController.deletePatientById);

// Route pour obtenir les données médicales d'un patient par ID
router.get('/:id/medicalData', patientController.getPatientMedicalData);

module.exports = router;
