angular.module('recipesModule').controller('recipesSearchCtrl',   function($scope,recipeService){
        recipeService.onLike(onlike);

        $scope.search = function () {
            recipeService.search($scope.searchData).then(function (data) {
                $scope.recipes = data;
            });
        }
        
        $scope.like = function (data) {
            recipeService.like(data).then(function (sucess) {
                if (!sucess) {
                    console.log("error in like");
                }
            });
        }

        function onlike(data) {
            if ($scope && $scope.recipes && $scope.recipes.length) {
                for (var r = 0; r < $scope.recipes.length; r++) {
                    if ($scope.recipes[r].id == data.id) {
                        $scope.recipes[r].likeAmount = data.likes;
                        break;
                    }
                }
            }
        }

});