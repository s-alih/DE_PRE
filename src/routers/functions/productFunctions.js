const productUpdateCheck = (product) => {
   const updateKey = Object.keys(product)
   const prodArray = ['name','quantity','price']
   const valid = updateKey.every((update) => prodArray.includes(update))
   if(!valid){
       return
   }
   return updateKey
}

module.exports  = { productUpdateCheck }