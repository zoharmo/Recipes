/**
 * Created by Yarden on 8/2/2016.
 */


angular.module('recipesApp').factory('recipeService', function ($http) {

    var client = io();
    var likeCallback = null;

    client.on('like', function (data) {
        if (likeCallback) {
            likeCallback(data);
        }
    });

    return {
        getAllByCategory: function(key) { // get by id
            return $http.get('/api/dataservice/GetRecipesByCategory/'+ key).then(function (response) {
                return response.data;
            });
        },
        createRecipes: function (value) {
            $http.post('/api/dataservice/CreateRecipe',value); 
        },
        like: function (data) {
            return $http.put('/api/dataservice/LikeRecipe/' + data.id).then(function (response) {
                return response.data.status;
            });
        },
        onLike: function (callback) {
            likeCallback = callback;
        },
        search:function (searchData) {
            return $http.post('/api/dataservice/SearchRecipes', searchData).then(function (response) {
                return response.data;
            })
        }
    };
});




