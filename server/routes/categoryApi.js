/**
 * Created by galco on 6/29/2016.
 */
var categoryDb = require('../accessDb/categoryADB')
    , recipeDb = require('../accessDb/recipeADB')
    , util = require('util')
    , multer = require('multer')
    , storage = multer.diskStorage({destination: '../public/uploads/categories',
                                    filename: function (req, file, cb) {cb(null, file.originalname )}
                                    })
    , upload = multer({ storage: storage });


exports.getAllCategories = function (req, res) {
    console.log('*** GetAllCategories API');
    categoryDb.getAllCategories(function(err, categories) {
        if (err) {
            console.log('*** GetAllCategories API Err');
            res.json({
                categories: categories
            });
        } else {
            console.log('*** GetAllCategories API OK');

            res.json(categories);
        }
    });
};

exports.getCategory = function (req,res) {
    console.log('*** GetCategory API');
    categoryDb.getCategory(req.params.id, function(err, category) {
        if (err) {
            console.log('*** GetCategory API Err');
            res.json({
                category: category
            });
        } else {
            console.log('*** GetCategory API Success');
            res.json(category);
        }
    });
}

exports.getAllCategoriesRecipes = function (req, res) {
    console.log('*** GetAllCategoriesRecipes API');
    categoryDb.getAllCategoriesRecipes(function(err, categories) {
        if (err) {
            console.log('*** GetAllCategoriesRecipes API Err');
            res.json({
                categories: categories
            });
        } else {
            console.log('*** GetAllCategoriesRecipes API OK');

            res.json(categories);
        }
    });
};

exports.uploadFile = function(req, res){
    console.log('*** UploadFile API');
    var uploadedFile = upload.single('file');

    uploadedFile(req, res, function (err) {
        if (err) {
            console.log('Error in file upload');
            return res.json(false);
        }
        console.log('file Uploaded');
        return res.json(req.body);
    });

};

exports.createCategory = function (req, res) {
    console.log('*** CreateCategory API');
    
    categoryDb.createCategory(req.body, function(err){
        if (err) {
            console.log('*** CreateCategory API Err');
            res.json(false);
        } else {
            console.log('*** CreateCategory API OK');

            res.json(req.body);
        }
    });
};


exports.deleteCategory = function (req, res) {
    console.log('*** DeleteCategory API');
    categoryDb.deleteCategory(req.params.id, function(err) {
        if (err) {
            console.log('*** DeleteCategory API Err');
            res.json({'status': false});
        } else {
            recipeDb.deleteRecipesCategory(req.params.id,function(){
                console.log('*** DeleteCategory API OK');
                res.json({'status': true});
            })

        }
    });
};


exports.editCategory = function (req, res) {
    console.log('*** EditCategory API');
    categoryDb.editCategory(req.body, function(err) {
        if (err) {
            console.log('*** EditCategory API Err');
            res.json({'status': false});
        } else {
            console.log('*** EditCategory API OK');

            res.json({'status': true});
        }
    });
};






