const mongoose = require('mongoose');

const paySchema = mongoose.Schema({
    idAccount: {
        type: String,
        required: true,
    },
    pay: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Pay', paySchema);

// ### Recibo de pago model ###

// from pydantic import BaseModel
// from typing import Optional



// class Recibo(BaseModel):
//     id: Optional[str]
//     id_cuenta:str
//     cantidad:str
//     fecha:str