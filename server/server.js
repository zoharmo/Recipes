/**
 * Module dependencies.
 */
var express = require('express')
   , routes = require('./routes/index')
   , recipeApi = require('./routes/recipeApi')
   , appUserApi = require('./routes/appUserApi')
   , categoryApi = require('./routes/categoryApi')
   , ingredientApi = require('./routes/ingredientApi')
   , DB = require('./accessDb/mainADB')
   , bodyParser = require('body-parser')
   , path = require('path')
   , http = require('http')
   , iolistener = require('socket.io');

var app = module.exports = express();
var server = http.Server(app);
var io = iolistener(server);

var iosockets = [];

io.on('connection', function(socket){
  console.log('a user connected');
  iosockets.push(socket);
  socket.on('disconnect', function() {
    console.log('user disconnected');
    iosockets.splice(iosockets.indexOf(socket), 1);
  });
});

// Configuration

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//let the server permission to use this files
app.use(express.static(path.join(__dirname , '../public')));

var conn = 'mongodb://localhost:27017/recipeSite';
var db;
db = new DB.startup(conn);


// JSON API

//AppUserApi
app.get('/api/dataservice/GetAppUsers', appUserApi.getAllAppUsers);
app.get('/api/dataservice/GetAppUser/:email/:password', appUserApi.getAppUser);
app.get('/api/dataservice/GetAppUsersRecipes', appUserApi.getAllAppUsersRecipes);
// app.get('/api/dataservice/GetAppUser/:email', appUserApi.getAppUser);
app.post('/api/dataservice/PostAppUser', appUserApi.createAppUser);
app.put('/api/dataservice/EditAppUser', appUserApi.editAppUser);
app.delete('/api/dataservice/DeleteAppUser/:email', appUserApi.deleteAppUser);
app.get('/api/dataservice/isUserExist/:email', appUserApi.isUserExist);

//Category
app.get('/api/dataservice/GetAllCategories', categoryApi.getAllCategories);
app.get('/api/dataservice/GetCategory/:id', categoryApi.getCategory);
app.get('/api/dataservice/GetAllCategoriesRecipes', categoryApi.getAllCategoriesRecipes);
app.post('/api/dataservice/CreateCategory', categoryApi.createCategory);
app.post('/api/dataservice/UploadCategoryImage', categoryApi.uploadFile);
app.delete('/api/dataservice/DeleteCategory/:id', categoryApi.deleteCategory);
app.put('/api/dataservice/EditCategory', categoryApi.editCategory);

//Recipe
app.get('/api/dataservice/GetAllRecipes', recipeApi.getAllRecipes);
app.get('/api/dataservice/GetRecipeById/:id', recipeApi.getRecipeById);
app.get('/api/dataservice/GetRecipeImageById/:id', recipeApi.getRecipeImageById);
app.get('/api/dataservice/GetRecipesByAppUser/:email', recipeApi.getRecipesByAppUser);
app.get('/api/dataservice/GetRecipesByCategory/:id', recipeApi.getRecipesByCategory);
app.delete('/api/dataservice/DeleteRecipesByAppUser/:email', recipeApi.deleteRecipesByAppUser); 
app.delete('/api/dataservice/DeleteRecipeById/:id', recipeApi.deleteRecipeById);
app.post('/api/dataservice/CreateRecipe', recipeApi.createRecipe);
app.post('/api/dataservice/SearchRecipes', recipeApi.searchRecipes);
app.put('/api/dataservice/EditRecipe', recipeApi.editRecipe);
app.put('/api/dataservice/LikeRecipe/:id', function (req, res) { recipeApi.likeRecipe(req, res, iosockets); });


//Ingredient
app.get('/api/dataservice/GetIngredientsByAppUser/:email', ingredientApi.getIngredientsByAppUser);
app.post('/api/dataservice/CreateIngredient', ingredientApi.createIngredient);
app.put('/api/dataservice/EditIngredient', ingredientApi.editIngredient);
app.delete('/api/dataservice/DeleteIngredientsByAppUser/:email', ingredientApi.deleteIngredientsByAppUser);
app.delete('/api/dataservice/DeleteIngredient/:id', ingredientApi.deleteIngredient);

// Start server

server.listen(8080, function(){
  console.log("CustMgr Express server listening on port %d in %s mode");
});

app.all('/*', function(request, response){
 console.log("serverrr    ");
    response.sendFile(path.join(__dirname , '../public/index.html'));
});
