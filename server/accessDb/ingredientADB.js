// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , IngredientModel = require('./../models/ingredient')

Ingredient = IngredientModel.schema
// connect to database
module.exports = {
    getIngredientsByAppUser: function(email, callback) {
        console.log('++ accessDb.ingredientADB: getIngredientsByAppUser find by user email');
        Ingredient.find({'user': email}, {}, function(err, ingredients) {
            callback(null, ingredients);
        });
    },
    createIngredient: function(req_body, callback) {
        console.log('*** CreateIngredient AccessDB');

        var ingredient = new Ingredient();

        ingredient.name = req_body.name;
        ingredient.calories = req_body.calories;
        ingredient.fat = req_body.fat;
        ingredient.user = req_body.user;

        var counter =  IngredientModel.counter;
        counter(function(err,count) {
            if (err) {
                console.log('*** CreateIngredient AccessDB Err on Incrasing Index: ' + err);
            }
            else
            {
                ingredient.id = count;
                ingredient.save(function (err) {
                    if (err) {
                        console.log('*** CreateIngredient AccessDB Err On saving: ' + err);
                        IngredientModel.updateCounter(); //for problem that id not move
                        callback(err);
                    }
                    else {
                        IngredientModel.updateCounter();
                        callback(null);
                    }
                });
            }
        });
    },
    editIngredient: function(req_body, callback) {
        console.log('*** EditIngredient AccessDB');

        Ingredient.findOne({'id': req_body.id}, {}, function(err, ingredient) {
            if (err) { return callback(err); }

            ingredient.name = req_body.name || ingredient.name;
            ingredient.calories = req_body.calories || ingredient.calories;
            ingredient.fat = req_body.fat || ingredient.fat;
            ingredient.user = req_body.user || ingredient.user;

            ingredient.save(function(err) {
                if (err) { console.log('*** edit ingredient err: ' + err); return callback(err); }
                callback(null);
            });

        });
    },
    deleteIngredientsByAppUser: function(email, callback) {
        console.log('*** DeleteIngredientsByAppUser AccessDB');
        Ingredient.remove({'user': email}, function(err) {
            callback(err);
        });
    },
    deleteIngredient: function(id, callback) {
        console.log('*** DeleteIngredient AccessDB');
        Ingredient.remove({'id': id}, function(err) {
            callback(null);
        });
    }
}
