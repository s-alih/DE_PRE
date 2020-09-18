const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
        
    },
    picture:{
        type:Buffer,
    }
})

const Product = mongoose.model('product',productSchema) 
module.exports = Product