const jwt = require('jsonwebtoken')

module.exports = (role) => async (req, res, next) => {
  try {
    const token = req.header('auth').replace('Bearer ', '')
    const verify = jwt.verify(token, process.env.SECRET_KEY)

    if (verify && verify.user.role === role) {
      next()
    } else if (Array.isArray(role) && role.includes(verify.user.role)) {
      next()
    } else {
      res.status(401).json({ msg: 'No estas autorizado' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'ERR:Token', error })
  }
}
