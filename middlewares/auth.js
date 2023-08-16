const jwt = require('jsonwebtoken')

module.exports = (role) => async (req, res, next) => {
  try {
    const token = req.header('auth').replace('Bearer ', '')
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    console.log(verify)
    if (verify && verify.user.role === role) {
      req.idUser = verify.user.id
      next()
    } else if (Array.isArray(role) && role.includes(verify.user.role)) {
      req.idUser = verify.user.id
      next()
    } else {
      res.status(401).json({ msg: 'No estas autorizado' })
    }
  } catch (error) {
    res.status(500).json({ msg: 'ERR:Token', error })
  }
}
