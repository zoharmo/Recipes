// Module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , AppUser = require('./../models/appUser')
  , Recipe = require('./../models/recipe').schema
  , Ingredient = require('./../models/ingredient').schema

// connect to database
module.exports = {
  // get all the customers
  getAppUsers: function(callback) {
    console.log('*** GetAppUsers AccessDB');
    AppUser.find({}, function(err, customers) {
      callback(null, customers);
    });
  },
  getAllAppUsersRecipes: function(callback) {
    console.log('*** GetAllAppUsersRecipes AccessDB');
    AppUser.aggregate([
            { $lookup: { from: "recipes", localField: "email", foreignField: "user", as: "recipes" } },
            { $project: { email: 1, recipes: { $size: "$recipes" } } },
            { $sort: { "recipes": -1 } }
        ], function(err, customers) {
      callback(null, customers);
    });
  },
  // get a  customer
  getAppUser: function(email, password, callback) {
    console.log('*** GetAppUser AccessDB');
    console.log(email + password);
    AppUser.find({'email': email, 'password': password}, {}, function(err, user) {
      callback(null, user[0]);
    });
  },

  // insert a  appUser
  createAppUser: function(req_body, callback) {
    console.log('*** CreateAppUser AccessDB');

    var appUser = new AppUser();

    appUser.userName = req_body.userName;
    appUser.password = req_body.password;
    appUser.email = req_body.email;
    appUser.isAdmin = req_body.isAdmin;
    appUser.gender = req_body.gender;


    //appUser.save(function(err, user) {
    appUser.save(function(err) {
      if (err) {console.log('*** new appUser save err: ' + err); return callback(err); }

      callback(null, appUser.email);
    });
  },

  editAppUser: function(req_body, callback) {
    console.log('*** EditAppUser AccessDB');

    AppUser.findOne({'email': req_body.email}, {}, function(err, appUser) {
      if (err) { return callback(err); }
      
      appUser.userName = req_body.userName || appUser.userName;
      appUser.password = req_body.password;

      if (req_body.isAdmin != null && req_body.isAdmin != undefined){
        appUser.isAdmin = req_body.isAdmin;
      }
      appUser.gender = req_body.gender || appUser.gender;

      appUser.save(function(err) {
        if (err) { console.log('*** accessDB.editCustomer err: ' + err); return callback(err); }

        callback(null);
      });

    });
  },
  
  deleteAppUser: function(email, callback) {
    console.log('*** DeleteAppUser AccessDB');
    AppUser.remove({'email': email}, function(err) {
      if (err) { callback(err); }
      else{callback(null)}
    });
  },

  isUserExist: function(email, callback) {
    console.log('*** isUserExist AccessDB');
    AppUser.find({'email': email}, {}, function(err, user) {
      callback(null, user[0]);
    });
  }
}
