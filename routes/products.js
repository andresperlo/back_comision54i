const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct, getOneProduct } = require('../controllers/products')
const auth = require('../middlewares/auth')

router.get('/', getAllProducts)
router.get('/:id', [
  check('id', 'Formato ID Incorrecto').isMongoId()
], getOneProduct)
router.post('/', [
  check('nombre', 'campo nombre esta vacio').notEmpty(),
  /*   check('nombre', 'Campo nombre. Min: 8 caracteres. Max: 25 caracteres').isLength({min: 8, max: 25}),
    check('nombre', 'Error Formato email incorrecto. EJ: example@dominio.com').isEmail(), */
  check('precio', 'campo precio esta vacio').notEmpty(),
  check('codigo', 'campo codigo esta vacio').notEmpty()

], auth('admin'),createProduct)
router.put('/:id', [
  check('id', 'Formato ID Incorrecto').isMongoId()
], auth('admin'), updateProduct)
router.delete('/:id', [
  check('id', 'Formato ID Incorrecto').isMongoId()
], auth('admin'), deleteProduct)

module.exports = router
