const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String, // This could be text, video, or any other format
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lectureSchema);
