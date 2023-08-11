const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  pass:{
    type: String,
    required: true
  },
  role:{
    type: String,
    default: 'user'
  },
  idCart:{
    type: String
  },
  token:{
    type: String,
    default: ''
  },
  
})

UserSchema.methods.toJSON = function(){
  const { __v, pass, ...user } = this.toObject()
  return user
}

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel
