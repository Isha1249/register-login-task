// Create schema for user model
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 
  currentToken:{
    type:String,
  },
  refreshToken:{
    type:String,
  },
},
{ timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = { User};

