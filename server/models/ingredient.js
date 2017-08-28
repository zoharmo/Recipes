var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectCounter = require('./objectCounter');

require('mongoose-double')(mongoose); //for double

var IngredientSchema = new Schema({
    name : {
        type : String, required: true, trim: true
    },
    calories : {
        type : mongoose.Schema.Types.Double, required: true, trim: true
    },
    fat : {
        type : mongoose.Schema.Types.Double, required: true, trim: true
    },
    id : {
        type : Number, required: true, index: { unique: true }
    },
    user:{type: String , ref: 'AppUser', required: true}
});

var count;

exports.updateCounter = function () {
    ObjectCounter.findOneAndUpdate({collectionName: "ingredients"}, { $inc: { nextSeqNumber: 1 } }, function (err, retCount) {})
    
};

exports.counter = function (callback) {
        ObjectCounter.find({"collectionName": "ingredients"}, {}, function(err, settings) {
            count = settings[0].nextSeqNumber;
            callback(err, count);
        });
};

exports.schema = mongoose.model('Ingredient', IngredientSchema);
