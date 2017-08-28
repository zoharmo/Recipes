(function(){
    "use strict";
    function userService($http){
        this.getAll = function(){
            return $http.get('/api/dataservice/GetAppUsers');
        };
        this.getAllRecipies = function () {
          return $http.get('/api/dataservice/GetAppUsersRecipes');  
        };

        this.removeUser = function (userMail) {
            return $http.delete('/api/dataservice/DeleteAppUser/' + userMail);
        }

        this.updateUser = function (user) {
            return $http.put('/api/dataservice/EditAppUser', user);
        }

        this.getUser = function (userMail, userPassword) {
            var user = {'email': userMail , 'password': userPassword};
            return $http.get('/api/dataservice/GetAppUser/' + userMail + "/" + userPassword);
        }

        this.createUser = function (user) {
            return $http.post('/api/dataservice/PostAppUser', user);
        }


        this.isUserExist = function (userMail) {
            return $http.get('/api/dataservice/isUserExist/' + userMail);
        }


    }

    angular.module('recipesApp').service('userService', ['$http', userService]);
})();