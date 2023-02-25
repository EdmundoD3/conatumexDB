const { id } = require('@hapi/joi/lib/base');
const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    idClinet: {
        type: String,
        required: true,
    },
    //suma total de pagos
    pay: {
        type: String,
        required: true,
    },
    dateSold: {
        type: Date
    },
    datePromo: {
      type: Date
    },
    // vendedora
    salesClerk: {
      name:{
        type:String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    //producto
    commoditys: [{
        type: String,
        required: true
    }],
    price: {
      credit: {
        type: Number,
        required: true
      },
      inCash: {
        type: Number,
        required: true
      }
    },
    // pagado, cancelado, pendiente, adeudo
    state: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Account', accountSchema);
