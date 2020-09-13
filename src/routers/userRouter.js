const express = require('express')
const Users = require('../models/users')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/addUsers', async (req,res) => {
    const user = new Users(req.body)
    try{
        await user.save()
        const token = await user.getToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/loginUser', async (req,res) => {
    try{
        const user = await Users.findByCredintials(req.body.username,req.body.password)
        res.send(user)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/profile',auth ,async (req,res) => {
   res.send(req.user)
})

router.get('/getUser/:id', async (req,res) => {
    try{
        const user = await Users.findById({_id:req.params.id})
        if(!user){
            return res.status(404).send({
                error:"Opss!! no user found"
            })
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router