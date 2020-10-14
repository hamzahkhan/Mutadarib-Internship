const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    internshipName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    internType: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    // compensation: {
    //     type: String,
    //     required: true
    // },
    // deadline: {
    //     type: Date,
    //     default: Date.now
    // },
    // startDate: {
    //     type: Date,
    //     default: Date.now
    // },
    // About :[
    //     {
    //         company: {
    //             type: Schema.Types.ObjectId
    //         },
    //         about: {
    //             type: String,
    //             required:true
    //         },
    //         url: {
    //             type: String,
    //             required: true
    //         },
    //     }
    // ],
    // skillsReqd:{
    //     type:String,
    //     required: true
    // },
    // aboutThisRole: {
    //     type: String,
    //     required: true
    // },
    // perks:{
    //     type: String,
    //     required:true
    // }
});

module.exports = mongoose.model('post', PostSchema);


// {
//     "internshipName": "Digital Marketing",
//     "company": "Sabbar",
//     "location":"Riyadh",
//     "internType":"Full-time",
//     "duration":"6 months",
//     "compensation":"3000 SAR/month",
//     "deadline":"31st September",
//     "startDate":"10th October",
//     "About":{
//         "about":"Awesome company really !!",
//         "url":"Sabbar.com"
//     },
//     "skillsReqd":"A, B, C",
//     "aboutThisRole":"great",
//     "perks":"money"
// }