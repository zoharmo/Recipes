(function () {
    "use strict";
    function recipeDetailsService($http) {
        this.getAllRecipes = function(){
            return $http.get('/api/dataservice/GetAllRecipes');
        };
        this.getRecipesByUser = function(email){
            return $http.get('/api/dataservice/GetRecipesByAppUser/' + email);
        };
        this.getRecipeById = function(id){
            return $http.get('/api/dataservice/GetRecipeById/' + id);
        };
        this.getRecipesByCategory = function(id){
            return $http.get('/api/dataservice/GetRecipesByCategory/' + id);
        };  
        this.addRecipe = function(recipe){
            return $http.post('/api/dataservice/CreateRecipe/', recipe);
        };
        this.saveRecipe = function(recipe){
            return $http.put('/api/dataservice/EditRecipe/', recipe);
        };
        this.deleteRecipe = function(id){
            return $http.delete('/api/dataservice/DeleteRecipeById/' + id);
        };
    }

    angular.module('recipesApp').service('recipeDetailsService', ['$http', recipeDetailsService]);
})();
