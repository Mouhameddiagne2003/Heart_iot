const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

// Route pour créer un médecin
router.post('/createmed', medecinController.createMedecin);

// Route pour obtenir tous les médecins
router.get('/meds', medecinController.getAllMedecins);

// Route pour obtenir un médecin par ID
router.get('/meds/:id', medecinController.getMedecinById);

// Route pour mettre à jour un médecin par ID
router.put('/:id', medecinController.updateMedecinById);

// Route pour supprimer un médecin par ID
router.delete('/:id', medecinController.deleteMedecinById);

module.exports = router;
