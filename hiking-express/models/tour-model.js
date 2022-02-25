const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name can not exceed 40 characters'],
    minlength: [2, 'A tour name must have minimum 2 characters']
  },
  description: String,
  date: String,
  difficulty: String,
  trail_length: Number,
  max_participants: Number
}, { collection: 'tour' });

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;