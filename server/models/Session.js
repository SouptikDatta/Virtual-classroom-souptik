const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
