/**
 * Created by Yarden on 8/2/2016.
 */

(function(){
    "use strict";
    function categoryRecipesCtrl($scope, recipeService, $location, $routeParams){//}, uiGridConstants, $filter){
        $scope.category = $routeParams.name;
        $scope.id = $routeParams.id;

        recipeService.getAllByCategory($scope.category).then(function (data) {
           $scope.recipes = data;
        });

        $scope.like = function (id) {
            console.log(id); 
            recipeService.like(id).then(function (sucess) {
                if(sucess)
                {
                    for (var x in $scope.recipes) {
                        if ($scope.recipes[x].id == id) {
                            $scope.recipes[x].likeAmount++;
                            return;
                        }
                    }
                }
                console.log("error in like");
            });
        }
    }
    angular.module('categoriesModule').controller('categoryRecipesCtrl', ['$scope', 'recipeService','$location', '$routeParams',  categoryRecipesCtrl])
})();