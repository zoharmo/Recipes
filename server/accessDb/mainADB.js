/**
 * Created by galco on 7/2/2016.
 */
// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectCounter = require('./../models/objectCounter')

// connect to database
module.exports = {
    // Define class variable
    myEventID: null,

    // initialize DB
    startup: function (dbToUse) {
        mongoose.connect(dbToUse);
        // Check connection to mongoDB
        mongoose.connection.on('open', function () {
            console.log('We have connected to mongodb');
            
            //initalize Counters
            ingredientCounter = new ObjectCounter();
            ingredientCounter.collectionName = "ingredients"
            ingredientCounter.save();
            recipeCounter = new ObjectCounter();
            recipeCounter.collectionName = "recipes"
            recipeCounter.save();
            categoryCounter = new ObjectCounter();
            categoryCounter.collectionName = "categories"
            categoryCounter.save();
        });

    },

    // disconnect from database
    closeDB: function () {
        mongoose.disconnect();
    }
}
