var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectCounter = require('./objectCounter');


var RecipeSchema = new Schema({
    title : {
        type : String, required: true, trim: true
    },
    content : {
        type : String, required: true, trim: true
    },
    image : {
        type : Buffer, ContentType: String//, required: true
    },
    imageType : {
        type : String, trim: true//, required: true
    },
    likeAmount : {
        type : Number, required: true
    },
    id : {
        type : Number, index: { unique: true }, required: true
    },
    categories: [
        {type: Number , ref: 'Category'}
    ],
    user:{type: String , ref: 'AppUser'}
});

var count;

exports.updateCounter = function () {
    ObjectCounter.findOneAndUpdate( {collectionName: "recipes"}, { $inc: { nextSeqNumber: 1 } }, function (err, retCount) {})
};

exports.counter = function (callback) {
        ObjectCounter.find({"collectionName": "recipes"}, {}, function (err, settings) {
            count = settings[0].nextSeqNumber;
            callback(err, count);
        });
};


exports.scehma = mongoose.model('Recipe', RecipeSchema);
