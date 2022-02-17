const mongoose = require('mongoose');

const glupostSchema = new mongoose.Schema({
    nesto: String,
    nesto2: String
}, { collection: 'glupost' });

const Glupost = mongoose.model('glupost', glupostSchema);

module.exports = Glupost;