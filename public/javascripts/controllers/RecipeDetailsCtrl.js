
(function(){
    "use strict";
    function recipeDetailsCtrl($scope, $location, $routeParams, recipeDetailsService){

        var recipeId = $routeParams.recipeId;

        recipeDetailsService.getRecipeById(recipeId).then(function (data) {
            if (!_.isEmpty(data) && !_.isEmpty(data.data)){
                $scope.recipeDetails = data.data;
                
                $scope.canEdit = $scope.$parent && $scope.$parent.currentUser && ($scope.$parent.currentUser.isAdmin || ($scope.$parent.currentUser.email == data.data.user));
            }
        });
        
        $scope.edit = function () {
            $scope.original = angular.copy($scope.recipeDetails);
            $scope.editMode = true;
        }
        
        $scope.save = function () {
            recipeDetailsService.saveRecipe($scope.recipeDetails).then(function () { $scope.editMode = false; });
        }

        $scope.cancel = function () {
            $scope.recipeDetails = $scope.original;
            $scope.editMode = false;
        }
        
        $scope.delete = function () {
            if (confirm('Are you sure you want delete?')) {
                recipeDetailsService.deleteRecipe($scope.recipeDetails.id).then(function () {
                    $location.path('/home');
                });
            }
        }
    }
    angular.module('recipesModule').controller('recipeDetailsCtrl', ['$scope', '$location', '$routeParams', 'recipeDetailsService',  recipeDetailsCtrl])
})();