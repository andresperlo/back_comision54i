const express = require('express') /* commonJS */
const morgan = require('morgan')
const cors = require('cors')

class Server {
  constructor() {
    this.app = express()
    //middleware
    this.middleware()

    //Rutas
    this.routes()

  }

  middleware() {
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(express.static('public'))
    this.app.use(cors())
  }

  routes() {
    this.app.use('/api/products', require('../routes/products'))
    this.app.use('/api/users', require('../routes/user'))
    this.app.use('/api/carts', require('../routes/cart'))
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log('Servidor en linea', process.env.PORT)
    })
  }
}

module.exports = Server
