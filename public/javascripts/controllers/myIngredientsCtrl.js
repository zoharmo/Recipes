/**
 * Created by galco on 7/26/2016.
 */
angular.module('recipesApp').controller('myIngredientsCtrl', function ($scope, ingredientService) {
    $scope.dataLoaded = false;
    $scope.gridScope = {
        deleteRelation: function (ingredientToRemove) {
            ingredientService.deleteIngredient(ingredientToRemove.id).then(function (status) {
                if (status) {
                    $scope.gridOptions.data = _.reject($scope.gridOptions.data, function (relation) {
                        return relation.id === ingredientToRemove.id;
                    });
                }
                else (status)
                {
                    console.log("error - delete ingredient");
                }
            });
        }
    }

    var columnDef = [
        {field: 'name'},
        {field: 'fat'},
        {field: 'calories'}
    ];
    if (!_.isEmpty($scope.$parent.currentUser) && $scope.$parent.currentUser.isAdmin) {
        columnDef[columnDef.length] = {
            name: 'actions',
            displayName: 'Actions',
            cellTemplate: '<button id="deleteBtn" type="button" class="btn-small btn-danger" ng-click="getExternalScopes().deleteRelation(row.entity)"><i class="fa fa-trash" aria-hidden="true"></i> </button>',
            // enableFiltering: false
        };
    }


    $scope.gridOptions = {
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: columnDef
    };

    $scope.gridOptions.minRowsToShow = 15;

    ingredientService.getIngredientsByAppUser($scope.currentUser.email).then(function (data) {
        console.log("++ controllers.myIngredientsCtrl call ingredientService.getIngredientsByAppUser");

        if (data.data && data.data.length > 0) {
            $scope.gridOptions.data = data.data;
            $scope.dataLoaded = true;
        }
        else {
            console.log("++get ingredients - not found data");
        }
    });

});