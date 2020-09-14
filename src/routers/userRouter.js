const express = require('express')
const Users = require('../models/users')
const auth = require('../middlewares/auth')
const { userUpdateCheck } = require('./functions/userFunctions')

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
        const token = await user.getToken()
        res.send({user,token})
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/profile',auth ,async (req,res) => {
   res.send(req.user)
})

router.patch('/updateUser',auth, async (req,res) => {
    const updatedData = userUpdateCheck(req.body)
    if(!updatedData){
       return res.status(400).send('Oops!! invalid update')
    } 
    try{
        updatedData.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
    

})

router.post('/logoutUser', auth ,async (req,res) => {
        try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            await req.user.save()
            res.send(req.user)
        }catch(e){
            res.status(400).send(e)
        }
})

router.post('/logoutAll',auth,async (req,res) =>  {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
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

router.delete('/deleteUser',auth,async (req,res) => {
    try{
        const user = await Users.findById({_id:req.user._id})
        if(!user){
           return res.status(404).send({
               error:'No user to delete'
           })
        }
        await user.remove()
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router