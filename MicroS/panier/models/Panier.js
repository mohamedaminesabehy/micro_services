const mongoose = require('mongoose');

const PanierSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true },
  prix: { type: Number, required: true },
  dateAjout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Panier', PanierSchema);
