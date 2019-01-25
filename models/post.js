const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const counter = mongoose.model('Counter', CounterSchema);

const PostSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
  content: { type: String, required: true }
});

PostSchema.query.byId = function(id) {
  return this.find({ id }).select('-_id -__v');
};

PostSchema.pre('save', function(next) {
  counter.findByIdAndUpdate(
    { _id: 'entityId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    (error, counter) => {
      if (error) return next(error);
      this.id = counter.seq;
      next();
    }
  );
});

module.exports = mongoose.model('posts', PostSchema);
