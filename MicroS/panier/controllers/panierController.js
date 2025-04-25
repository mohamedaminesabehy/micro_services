const Panier = require('../models/Panier');

exports.ajouterProduit = async (req, res) => {
  try {
    const { nom, quantite, prix } = req.body;
    const nouveauProduit = new Panier({ nom, quantite, prix });
    await nouveauProduit.save();
    res.status(201).json({ message: 'Produit ajouté au panier', produit: nouveauProduit });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Modifié pour retourner JSON au lieu de rendre une vue
exports.listerProduits = async (req, res) => {
  try {
    const produits = await Panier.find();
    res.status(200).json({ produits });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du panier', error: err.message });
  }
};

exports.supprimerProduit = async (req, res) => {
  try {
    const produitId = req.params.id;
    await Panier.findByIdAndDelete(produitId);
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};