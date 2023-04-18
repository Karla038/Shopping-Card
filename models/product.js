const mongoose = require('mongoose');


//Este es para definir el esquema de la colección en mongo
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        },
        name: {
        type: String,
        required:true,
        },
        price: {
        type: Number,
        required:true,
        },
        description: {
        type: String,
        },
        images:[String],
        });

module.exports = mongoose.model('product', productSchema); 