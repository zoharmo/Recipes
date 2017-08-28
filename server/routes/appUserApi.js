var appUserDB = require('../accessDb/appUserADB')
  , recipeDB = require('../accessDb/recipeADB')
  , ingredientDB = require('../accessDb/ingredientADB')


///////////////// appUser
/**
 * Check if email exist with the getting password. If it does- get user, otherwise-null
 * @param req
 * @param res
 */
exports.getAppUser = function (req, res) {
  console.log('*** GetAppUser API');
  appUserDB.getAppUser(req.params.email, req.params.password, function(err, appUser) {
    if (err) {
      console.log('*** GetAppUser API Err');
      res.json({
        appUser: appUser
      });
    } else {
      console.log('*** GetAppUser API Success');

      res.json(appUser);
    }
  });
};

exports.getAllAppUsers = function (req, res) {
  console.log('*** GetAppUsers API');
  appUserDB.getAppUsers(function(err, appUsers) {
    if (err) {
      console.log('*** GetAppUsers API Err');
      res.json({
        appUsers: appUsers
      });
    } else {
      console.log('*** GetAppUsers API OK');

      res.json(appUsers);
    }
  });
};

exports.getAllAppUsersRecipes = function (req, res) {
  console.log('*** getAllAppUsersRecipes API');
  appUserDB.getAllAppUsersRecipes(function(err, appUsersRecipes) {
    if (err) {
      console.log('*** getAllAppUsersRecipes API Err');
      res.json({
        appUsersRecipes: appUsersRecipes
      });
    } else {
      console.log('*** getAllAppUsersRecipes API OK');

      res.json(appUsersRecipes);
    }
  });
};

exports.createAppUser = function (req, res) {
  console.log('*** AddAppUser API');
      appUserDB.createAppUser(req.body, function(err){
        if (err) {
          console.log('*** AddAppUser API Err');
          res.json(false);
        } else {
          console.log('*** AddAppUser API OK');

          res.json(req.body);
        }
      });
};

exports.editAppUser = function (req, res) {
  console.log('*** EditAppUser');
      appUserDB.editAppUser(req.body, function(err) {
        if (err) {
          // console.log('*** editAppUser err' + util.inspect(err));
          console.log('*** EditAppUser API Err');
          res.json({'status': false});
        } else {
          console.log('*** EditAppUser API OK');

          res.json({'status': true});
        }
      });
};

exports.deleteAppUser = function (req, res) {
  console.log('*** DeleteAppUser API');
  var email = req.params.email;
  appUserDB.deleteAppUser(email, function(err) {
    if (err) {
      console.log('*** DeleteAppUser API Err');
      res.json({'status': false});
    } else {
      recipeDB.deleteRecipesByAppUser(email, function(err){
        ingredientDB.deleteIngredientsByAppUser(email, function(err){
          console.log('*** DeleteAppUser API OK');
          res.json({'status': true});
        });
      });
    }
  });
};


/**
 * Check if user (email) is already exist. If it does return true, otherwise- return false
 * @param req
 * @param res
 */
exports.isUserExist = function (req, res) {
  console.log('*** isUserExist API');
  appUserDB.isUserExist(req.params.email, function(err, appUser) {
    if (err) {
      console.log('*** isUserExist API Err');
      res.json();
    } else {
      console.log('*** isUserExist API Success');

      if (appUser == undefined){
        res.json(false);
      } else{
        res.json(true);

      }
    }
  });
};