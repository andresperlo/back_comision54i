const ProductModel = require("../models/product")
const { validationResult } = require('express-validator')

const getAllProducts = async (req, res) => {/* req - request, res - response */

  try {
    /* Devuelva todos los productos del array */
    const allProducts = await ProductModel.find()
    res.status(200).json({ msg: 'Productos en el array', allProducts })
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo enviar los productos', error)
  }
}

const getOneProduct = async (req, res) => {/* req - request, res - response */
  console.log(req.params)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() })
  }

  try {
    /* Devuelva un producto de la base de datos */
    const oneProduct = await ProductModel.findOne({ _id: req.params.id })
    res.status(200).json({ msg: 'Producto en la base de datos', oneProduct })
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo enviar los productos', error)
  }
}

const createProduct = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() })
  }

  try {
    const { body } = req

    const newProduct = new ProductModel(body)
    await newProduct.save()

    res.status(201).json({ msg: 'Producto creado correctamente', body, status:201 })
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo crear el producto', error)
  }
}

const updateProduct = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() })
  }

  try {
    const updateProd = await ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({ msg: 'Producto editado correctamente', updateProd, status: 200 })
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo modificar el producto', error)
  }
}

const deleteProduct = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() })
  }
  
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Se borro correctamente el producto', status: 200 })
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo borrar el producto', error)
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
