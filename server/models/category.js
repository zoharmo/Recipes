var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectCounter = require('./objectCounter');


var CategorySchema = new Schema({
    name : {
        type : String, required: true, trim: true, unique: true 
    },
    id : {
        type : Number, index: { unique: true }
    },
    image : {
        type: String, required: true
    }
});

var count;

exports.updateCounter = function () {
    ObjectCounter.findOneAndUpdate( {collectionName: "categories"}, { $inc: { nextSeqNumber: 1 } }, function (err, retCount) {})
};

exports.counter = function (callback) {
        ObjectCounter.find({"collectionName": "categories"}, {}, function(err, settings) {
            count = settings[0].nextSeqNumber;
            callback(err, count);
        });
};

exports.schema = mongoose.model('Category', CategorySchema);
