const CartModel = require('../models/cart')
const ProductModel = require('../models/product')

const getCartProducts = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.id })
    res.status(200).json({ cart })
  } catch (error) {
    
  }
}

const addProdcutCart = async (req, res) => {
  try { 
    const cart = await CartModel.findOne({_id: req.params.idCart})
    const product = await ProductModel.findOne({_id: req.params.idProd})
    const prodArray = []
    
    for (let i = 0; i < cart.products.length; i++) {
      const prod = cart.products[i];
      if(prod._id == req.params.idProd){
        prodArray.push(prod)
      }
    }

    if(prodArray.length > 0){
      return res.status(400).json({msg:'El producto ya existe en el carrito', status: 400})
    }
    
    cart.products.push(product)

    await cart.save()
    res.status(200).json({msg:'Producto cargado correctamente', cart, status: 200})
  } catch (error) {
    res.status(500).json(error)
  }
}



module.exports = {
  getCartProducts,
  addProdcutCart
}
