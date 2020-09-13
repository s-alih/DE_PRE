const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
    email:{
        type:String,
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
    }
})

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