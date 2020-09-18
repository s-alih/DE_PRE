const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userShema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        city:{
            type:String
        },
        state:{
            type:String,
        },
        zipcode:{
            type:String
        },
        district:{
            type:String
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
userShema.virtual('product',{
    ref:'product',
    localField:'_id',
    foreignField:'owner'
})

userShema.methods.getToken = async function(){

    const user = this
    const token =  jwt.sign({_id:user._id.toString()},process.env.JWT_TOKEN)
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token

}

userShema.statics.findByCredintials = async (username,password) => {
    const user = await Users.findOne({username})
    if(!user){
        throw Error('Unable to login')
    }
    const isMath = await bcrypt.compare(password,user.password)
    if(!isMath){
        throw Error('Unable to login')
    }

    return user
}

userShema.pre('save', async function(next){
    const user = this
    //hashing password before storing in server
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
} )

const Users = mongoose.model('Users',userShema) 

module.exports = Users