const jwt = require('jsonwebtoken')
const Users = require('../models/users')

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const authenticate =  jwt.verify(token,process.env.JWT_TOKEN)
        const user = await Users.findOne({_id:authenticate._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send(e)
    }

}

module.exports = auth