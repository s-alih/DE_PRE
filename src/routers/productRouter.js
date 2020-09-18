const express = require('express')
const app = require('../app')
const multer = require('multer')
const sharp = require('sharp')

const auth = require('../middlewares/auth')
const Products = require('../models/product')
const { productUpdateCheck ,asyncForeEach} = require('./functions/productFunctions')


const router = express.Router()

const picture = multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
            cb( new Error('please upload a valid  image'),)
        }
        cb(undefined,true)
    }
})

router.post('/AddProduct', auth,picture.single('picture'),async (req,res) => {
    try{
        const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
        const product = new Products({...req.body,owner:req.user._id,picture:buffer})
        await product.save()
        res.send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/editProduct/:id', async (req,res) => {
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
router.get('/getAllProduct',async (req,res) =>  {
    
    try{
        //initilised empty array
        var array =[];
        const length = await Products.length
        const products = await Products.find()
        await asyncForeEach(products, async (product,index,products)=>{          
                   const data = await product
                    .populate('owner')
                    .execPopulate()
            array.push({
                productName:product.name,
                price:product.price,
                quantity:product.quantity,
                ownerName:data.owner.name,
                ownerPhoneNo:data.owner.phone,
                ownerUsername:data.owner.username,
            })
            // console.log(array)   
        })
       
        console.log('hello world before response')
        //want array outside the forEach function
        console.log(array)
        res.send(array);
    }catch(e){
        res.status(400).send(e);
    }
})

router.delete('/deleteProduct/:id', async (req,res) => {
    try{
        const product = await Products.findById({_id:req.params.id})
        if(!product){
            return res.status(404).send('Opps!! no product to delete')
        }
        const data = await product.remove()
        res.send(data)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router