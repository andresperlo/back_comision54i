const { validationResult } = require("express-validator")
const UserModel = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CartModel = require("../models/cart")
const { findByIdAndUpdate } = require("../models/product")

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find()
    res.status(200).json({ msg: 'Usuarios encontrados', allUsers })
  } catch (error) {
    res.status(500).json({ msg: 'No se encontro a los usuarios', error })
  }
}

const getOneUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }
    const oneUser = await UserModel.findOne({ _id: req.params.id })
    res.status(200).json({ msg: 'usuario encontrado', oneUser })
  } catch (error) {
    res.status(500).json({ msg: 'No se encontro al usuario', error })
  }
}

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }

    const userExist = await UserModel.findOne({ username: req.body.username })

    if (userExist) {
      return res.status(400).json({ msg: 'Usuario ya existe' })
    }

    const newUser = new UserModel(req.body)
    const newCart = new CartModel()

    newUser.idCart = newCart._id
    newCart.idUser = newUser._id

    const salt = await bcrypt.genSaltSync()
    newUser.pass = await bcrypt.hash(req.body.pass, salt)

    await newUser.save()
    await newCart.save()

    res.status(201).json({ msg: 'Usuario creado correctamente', newUser, status: 201 })
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario', error })
  }
}

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }


    const updateDataUser = await UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({ msg: 'Usuario actualizado', updateDataUser, status: 200 })
  } catch (error) {
    res.status(500).json({ msg: 'Error en los datos', error })
  }
}


const deleteUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }


    await UserModel.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al borrar', error })
  }
}

const loginUser = async (req, res) => {/* req - request - res - resolve */
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }

    const userExist = await UserModel.findOne({ username: req.body.username })

    if (!userExist) {
      return res.status(400).json({ msg: 'Usuario no existe' })
    }

    const passCheck = await bcrypt.compare(req.body.pass, userExist.pass)

    if (passCheck) {
      const payload_jwt = {
        user: {
          id: userExist._id,
          role: userExist.role
        }
      }

      const token = jwt.sign(payload_jwt, process.env.SECRET_KEY)
      userExist.token = token
      //const updateData = await UserModel.findByIdAndUpdate({_id: userExist._id}, userExist, {new: true})
      res.status(200).json({ msg: 'Usuario logueado', userExist })
    } else {
      res.status(400).json({ msg: 'Usuario y/o contraseña incorrecto' })
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error al iniciar sesion', error })
  }
}

const logout = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.idUser })
    user.token = ''
    await UserModel.findByIdAndUpdate({ _id: req.idUser }, user, { new: true })
    res.status(200).json({ msg: 'Usuario Deslogueado' })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logout
}
