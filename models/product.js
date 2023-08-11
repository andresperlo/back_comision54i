const {Schema, model}  = require('mongoose')

const ProductSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  codigo: {
    type: Number,
    unique: true,
    required: true
  }
})

ProductSchema.methods.toJSON = function(){
  const { __v, ...product } = this.toObject()
  return product
}

const ProductModel = model('products', ProductSchema);

module.exports = ProductModel
