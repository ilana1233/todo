const mongoose = required('mongoose');

const itemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('item', itemSchema);