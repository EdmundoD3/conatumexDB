const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 255
    },
    email: {
      type: String,
      required: false,
      min: 6,
      max: 512
    },
    phone: {
      type: Number,
      require: false
    },
    collector: {
      type: String,
      require:true,
      min:3,
      max:255
    },
    address: {
      //street
      street: {
        type: String,
        required: true,
        min: 6,
        max: 255
      },
      number: {
        type: String,
        required: true
      },
      //no encontre un equivalente
      colonia: {
        type: String,
        required: true,
        min: 6,
        max: 127
      },
      //state
      state: {
        type: String,
        required: true,
        min: 6,
        max: 127
      },
      city: {
        type: String,
        required: true,
        min: 6,
        max: 127
      },
      betweenStreet:{
        type: String,
        required: true,
        min: 6,
        max: 127
      }
    },
    date: {
        type: Date,
        default: Date.now
    },
    observation: { type: String,
      max: 512 
    },
    comments: { type: String,
      max: 512 
    }
})

module.exports = mongoose.model('Client', clientSchema);
