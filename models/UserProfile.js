// public information

//public info

const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  education:{
    type:String,  
    required:true,     
  },
  linkedin:{
      type:String
  },
  description: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model('userProfile', UserProfileSchema);
