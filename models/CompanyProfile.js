//public info

const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
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
  location: {
      type:String,
      required:true
  },
  website: {
      type: String,
      required:true
  },
  linkedin:{
      type:String
  },
  description: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model('companyProfile', CompanySchema);
