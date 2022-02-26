const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  tour_id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: [true, 'A review must have rating'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'A review must have text'],
    trim: true,
  },
}, { collection: 'review' });

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;