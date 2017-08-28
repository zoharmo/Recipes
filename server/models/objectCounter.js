
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var SettingsSchema = new Schema({
    collectionName : {
        type : String, required: true, index: { unique: true }
    },
    nextSeqNumber: {
        type: Number, default: 1
    }
});

var objectCounter;
// I make sure this is the last pre-save middleware (just in case)
module.exports = mongoose.model('settings', SettingsSchema);


