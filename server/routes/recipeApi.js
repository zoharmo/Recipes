var db = require('../accessDb/recipeADB')

exports.getAllRecipes = function (req, res) {
    console.log('*** GetAllRecipes API');

    db.getAllRecipes(function(err, recipes) {
        if (err) {
            console.log('*** GetAllRecipes API Err');
            res.json({
                recipes: recipes
            });
        } else {
            console.log('*** GetAllRecipes API OK');

            res.json(recipes);
        }
    });
};

exports.getRecipeById = function (req, res) {
    console.log('*** GetRecipeById API');

    db.getRecipeById(req.params.id, function(err, recipe) {
        if (err) {
            console.log('*** GetRecipeById API Err');
            res.json({
                recipe: recipe
            });
        } else {
            console.log('*** GetRecipeById API OK');

            res.json(recipe);
        }
    });
};

exports.getRecipeImageById = function (req, res) {
    console.log('*** GetRecipeImageById API');

    db.getRecipeById(req.params.id, function(err, recipe) {
        if (err) {
            console.log('*** GetRecipeImageById API Err');
            res.json({
                recipe: recipe
            });
        } else {
            console.log('*** GetRecipeImageById API OK');

            res.set('Content-Type', recipe.imageType);
            res.end(recipe.image, 'binary');
        }
    });
};

exports.getRecipesByAppUser = function (req, res) {
    console.log('*** GetRecipesByAppUser API');
    db.getRecipesByAppUser(req.params.email, function(err, recipes) {
        if (err) {
            console.log('*** GetRecipesByAppUser API Err');
            res.json({
                recipes: recipes
            });
        } else {
            console.log('*** GetRecipesByAppUser API OK');
            res.json(recipes);
        }
    });
};


exports.getRecipesByCategory = function (req, res) {
    console.log('*** GetRecipesByCategory API');
    db.getRecipesByCategory(req.params.id, function(err, recipes) {
        if (err) {
            console.log('*** GetRecipesByCategory API Err');
            res.json({
                recipes: recipes
            });
        } else {
            console.log('*** GetRecipesByCategory API OK');
            res.json(recipes);
        }
    });
};

exports.searchRecipes = function (req, res) {
    console.log('*** SearchRecipes API');
    db.searchRecipes(req.body, function(err, recipes) {
        if (err) {
            console.log('*** SearchRecipes API Err');
            res.json({
                recipes: recipes
            });
        } else {
            console.log('*** SearchRecipes API OK');
            res.json(recipes);
        }
    });
};

exports.deleteRecipesByAppUser = function (req, res) {
    console.log('*** DeleteRecipesByAppUser API');
    db.deleteRecipesByAppUser(req.params.email, function(err) {
        if (err) {
            console.log('*** DeleteRecipesByAppUser API Err');
            res.json({'status': false});
        } else {
            console.log('*** DeleteRecipesByAppUser API OK');
            res.json({'status': true});
        }
    });
};

exports.deleteRecipeById = function (req, res) {
    console.log('*** DeleteRecipeById API');
    db.deleteRecipeById(req.params.id, function(err) {
        if (err) {
            console.log('*** DeleteRecipeById API Err');
            res.json({'status': false});
        } else {
            console.log('*** DeleteRecipeById API OK');
            res.json({'status': true});
        }
    });
};

exports.createRecipe = function (req, res) {
    console.log('*** CreateRecipe API');
    db.createRecipe(req.body, function(err, id){
        if (err) {
            console.log('*** CreateRecipe API Err');
            res.json(false);
        } else {
            console.log('*** CreateRecipe API OK');
            req.body.id = id;
            res.json(req.body);
        }
    });
};

exports.editRecipe = function (req, res) {
    console.log('*** EditRecipe API');
    db.editRecipe(req.body, function(err) {
        if (err) {
            // console.log('*** editAppUser err' + util.inspect(err));
            console.log('*** EditRecipe API Err');
            res.json({'status': false});
        } else {
            console.log('*** EditRecipe API OK');

            res.json({'status': true});
        }
    });
};


exports.likeRecipe = function (req, res, iosockets) {
    console.log('*** LikeRecipe API');
    db.likeRecipe(req.params.id, iosockets, function(err) {
        if (err) {
            console.log('*** LikeRecipe API Err');
            res.json({'status': false});
        } else {
            console.log('*** LikeRecipe API OK');

            res.json({'status': true});
        }
    });
};




