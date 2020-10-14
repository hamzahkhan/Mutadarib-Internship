// postid, userid, companyid
// timeofapplication, notes at time of adding, cover letter, specific URLs portfolio,

// provides analytics to company and user - who applied how much and when.

// count => no of pplications and applicants

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    timeofapplication:{
        type:Date,
        default:Date.now
    },
    notes: {
        //string
    },
    upload: {
        type: 
    },
    URLS: {
        //string
    }
    //multer => S3 file upload
    