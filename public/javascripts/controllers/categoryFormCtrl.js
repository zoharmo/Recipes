
(function(){
    "use strict";
    function categoryFormCtrl($scope, categoriesService, $location, $routeParams){//}, uiGridConstants, $filter){
        $scope.uploadInProgress = false;
        if ($routeParams.id == undefined)
            $scope.formData = {};
        else
            categoriesService.get($routeParams.id).then(function (data) {
                $scope.formData = data;
            });

        $scope.setFile = function(element) {
            $scope.currentFile = element.files[0];
            $scope.formData.image = $scope.currentFile.name;
            var reader = new FileReader();

            reader.onload = function(event) {
                $scope.image_source = event.target.result
                $scope.$apply()

            }
            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(element.files[0]);
        }

        $scope.fullSubmit = function() {
            var fileData = new FormData();
            fileData.append('file', $scope.currentFile );
            if(fileData)
            {
                categoriesService.uploadImage(fileData).then(function(response)
                {
                    if(response.data) {
                        if($routeParams.id) //update category
                        {
                            $scope.formData.id = $routeParams.id;
                            categoriesService.set($scope.formData).then(function (status) {
                                $location.path('/categories');
                            });
                        }
                        else { //new category
                            categoriesService.saveData($scope.formData).then(function (status) {
                                $location.path('/categories');
                            });
                        }
                    }
                    else
                    {
                        $scope.error = "Error uploading image"
                    }
                });
            }
            else
            {
                $scope.error = "Please upload image"
            }
        };
    }
    angular.module('categoriesModule').controller('categoryFormCtrl', ['$scope', 'categoriesService','$location', '$routeParams',  categoryFormCtrl])
})();
