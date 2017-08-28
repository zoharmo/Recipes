angular.module('recipesApp').factory('ingredientService', function ($http) {
    return {
        getIngredientsByAppUser: function(key) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('/api/dataservice/GetIngredientsByAppUser/' + key)
        },
        createIngredient : function(value) { // set by id
             return $http.post('/api/dataservice/CreateIngredient' ,value);//.then(function (response) {
        },
        editIngredient :  function(value) { // remove by id
            return $http.put('/api/dataservice/DeleteIngredient' ,  value);

        },
        deleteIngredientsByAppUser : function (key) {
            return $http.delete('/api/dataservice/DeleteIngredientsByAppUser/'  + key);
        },
        deleteIngredient : function (key) {
            return $http.delete('/api/dataservice/DeleteIngredient/' + key);
        }
    };
});