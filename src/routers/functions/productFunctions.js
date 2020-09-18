const productUpdateCheck = (product) => {
   const updateKey = Object.keys(product)
   const prodArray = ['name','quantity','price']
   const valid = updateKey.every((update) => prodArray.includes(update))
   if(!valid){
       return
   }
   return updateKey
}

const populateProduct= (products) => {
    var array = []
    
    products.forEach(async (product) => {
            
        // console.log(product)
        const data =await product
            .populate('owner')
            .execPopulate()
        // console.log(product.price)
        // console.log(data.owner.name)
        array2 =  array.concat({
            productName:product.name,
            price:product.price,
            quantity:product.quantity,
            ownerName:data.owner.name,
            ownerPhoneNo:data.owner.phone,
            ownerUsername:data.owner.username,
        })

        // console.log(array2)
    })
}
const asyncForeEach = async(products,callback) => {
    for(let index = 0 ;index < products.length;index++){
        await callback(products[index])
    }
}


module.exports  = { productUpdateCheck ,asyncForeEach}