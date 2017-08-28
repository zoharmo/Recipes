var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var AppUserSchema = new Schema({
    userName : {
        type : String, required: true, trim: true
    },
    password : {
        type : String, required: true, trim: true
    },
    email : {
        type : String, required: true, trim: true, index: { unique: true }
    },
    isAdmin: {
        type : Boolean, required: true
    },
    gender : {
        type: String, required: true, trim: true
    }
});

exports.AppUserSchema = AppUserSchema;
module.exports = mongoose.model('AppUser', AppUserSchema);
