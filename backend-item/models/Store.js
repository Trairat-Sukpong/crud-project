const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  itemName: String,
  itemImage: String,
  itemPrice: String,
  itemAmount: String,
  create_at: {type: Date, default: Date.now }
});

const StoreModel = mongoose.model('Store', storeSchema);

module.exports = StoreModel;