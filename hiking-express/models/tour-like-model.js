const mongoose = require('mongoose');

const tourLikeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  tour_id: {
    type: String,
    required: true,
  },
}, { collection: 'tourlike' });

const TourLike = mongoose.model('tourlike', tourLikeSchema);

module.exports = TourLike;