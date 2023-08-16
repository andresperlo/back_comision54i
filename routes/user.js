const { Router } = require('express')
const { check } = require('express-validator')

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser, logout } = require('../controllers/user')
const auth = require('../middlewares/auth')
const router = Router()

router.get('/',auth('admin'), getAllUsers)
router.get('/logout',auth(['admin', 'user']), logout)
router.get('/:id', [
  check('id', 'Formato ID incorrecto').isMongoId()
],auth(['admin', 'user']),getOneUser)
router.post('/login', [
  check('username', 'campo USERNAME vacio').notEmpty(),
  check('pass', 'campo CONTRASEÑA vacio').notEmpty(),
], loginUser)
router.post('/', [
  check('username', 'campo USERNAME vacio').notEmpty(),
  check('username', 'MAX: 50 caracteres').isLength({ max: 50 }),
  check('pass', 'campo CONTRASEÑA vacio').notEmpty(),
  check('pass', 'MIN: 8 caracteres. MAX: 50 caracteres').isLength({ min: 8, max: 50 }),
], createUser)

router.put('/:id', [
  check('id', 'Formato ID incorrecto').isMongoId()
], updateUser)
router.delete('/:id', [
  check('id', 'Formato ID incorrecto').isMongoId()
], deleteUser)

module.exports = router

