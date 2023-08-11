const { Router } = require('express')
const { getCartProducts, addProdcutCart } = require('../controllers/carts')
const auth = require('../middlewares/auth')
const router = Router()

router.get('/:id', auth('user'), getCartProducts)
router.post('/:idCart/:idProd', auth('user'), addProdcutCart)

module.exports = router
