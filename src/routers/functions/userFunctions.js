const userUpdateCheck = (updateUser) =>{
    const updates = Object.keys(updateUser)
    const validUserKey = ['name','username','password','address','phone']
    const checkValidUpdateUser = updates.every((update)=>validUserKey.includes(update))
    if(!checkValidUpdateUser){
      return 
    }

    const addresArray = Object.keys(updateUser.address)
    const validAddressKey = [ 'city', 'state', 'district', 'zipcode' ]
    const checkValidUpdateAddress = addresArray.every((address) => validAddressKey.includes(address))
    if(!checkValidUpdateAddress){
        return 
    }
    return updates



}



module.exports = {userUpdateCheck}