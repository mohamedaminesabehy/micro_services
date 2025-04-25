const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

// Route GET pour lister les produits (JSON)
router.get('/', panierController.listerProduits);
// Route POST pour ajouter un produit (JSON)
router.post('/ajouter', panierController.ajouterProduit);

// Route DELETE pour supprimer un produit (JSON)
router.delete('/supprimer/:id', panierController.supprimerProduit);

module.exports = router;