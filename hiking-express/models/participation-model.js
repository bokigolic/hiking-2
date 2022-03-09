const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  tour_id: {
    type: String,
    required: true,
  },
}, { collection: 'participation' });

const Participation = mongoose.model('participation', participationSchema);

module.exports = Participation;