// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , CategoryModel = require('./../models/category')
    , Recipe = require('./../models/recipe')

Category = CategoryModel.schema;
module.exports = {
    getAllCategories: function(callback) {
        console.log('*** GetAllCategories AccessDB');
        Category.find({}, function(err, categories) {
            callback(null, categories);
        });
    },
    getAllCategoriesRecipes: function(callback) {
        console.log('*** GetAllCategoriesRecipes AccessDB');
        Category.aggregate([
            { $lookup: { from: "recipes", localField: "id", foreignField: "categories", as: "recipes" } },
            { $project: { id: 1, name: 1, recipes: { $size: "$recipes" } } },
            { $sort: { "recipes": -1 } }
        ], function(err, categories) {
            callback(null, categories);
        });
    },
    getCategory: function(id, callback) {
        console.log('*** GetCategory AccessDB');
        Category.find({'id': id}, function(err, category) {
            callback(null, category);
        });
    },
    createCategory: function(req_body, callback) {
        console.log('*** CreateCategory AccessDB');

        var category = new Category();

        category.name = req_body.name;
        category.image = req_body.image;

        var counter =  CategoryModel.counter;
        counter(function(err,count) {
            if (err) {
                console.log('*** CreateCategory AccessDB Err on Incrasing Index: ' + err);
            }
            else
            {
                category.id = count;
                category.save(function (err) {
                    if (err) {
                        console.log('*** CreateCategory AccessDB Err On saving: ' + err);
                        CategoryModel.updateCounter(); //for problem that id not move
                        callback(err);
                    }
                    else {
                        CategoryModel.updateCounter();
                        callback(null);
                    }
                });
            }
        });
    },
    editCategory: function(req_body, callback) {
        console.log('*** EditCategory AccessDB');

        Category.update(
            { id: req_body.id },
            {
                name: req_body.name,
                image: req_body.image,
            },
            function(err, category){
                if (err) {
                    console.log('*** EditCategory AccessDB Err: ' + err); return callback(err); }
                else
                {
                    return callback(null);
                }
            }
        )
    },
    deleteCategory: function(id, callback) {
        console.log('*** DeleteCategory AccessDB');
        Category.remove({'id': id}, function(err) {
            callback(null);
        });
    }
}
