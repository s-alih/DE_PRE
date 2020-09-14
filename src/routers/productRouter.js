const express = require('express')
const app = require('../app')
const Products = require('../models/product')
const { productUpdateCheck } = require('./functions/productFunctions')

const router = express.Router()

router.post('/AddProduct', async (req,res) => {
    try{
        await product.save()
        res.send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/EditProduct/:id', async (req,res) => {
    const productKey = productUpdateCheck(req.body)
    if(!productKey){
        return res.status(400).send('Opss! bad request')
    }
    try{
        const product = await Products.findById({_id:req.params.id})
        productKey.forEach((update) => {
           product[update] = req.body[update]
        })
       await product.save()
       res.send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/getProduct/:id', async (req,res) => {
    try{
        const product = await Products.findById({_id:req.params.id})
        if(!product){
            res.status(404).send('Product not found')
        }
        res.send(product)
    }catch(e){
        res.status(404).send(e)
    }
})


module.exports = router