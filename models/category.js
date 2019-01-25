const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

CategorySchema.query.byName = function(title) {
  return this.find({ title });
};

module.exports = mongoose.model('Category', CategorySchema);
