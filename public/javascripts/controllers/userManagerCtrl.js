(function(){
    "use strict";
    function userManagerCtrl($scope, userService, isNew,$window,$location,$cookieStore ){
        var self = this;
        $scope.isNew = isNew;
        $scope.isShowMessage = false;

        $scope.appUser = {'userName': '',
                          'password': "",
                          'email': "",
                          'isAdmin': false,
                          'gender': "F"};

        if (isNew){
            $scope.titleLabel = "Sign Up";
            $scope.btnTitle = "Sign Up";
        } else {
            $scope.titleLabel = "User Details";
            $scope.appUser = $scope.$parent.currentUser;
            $scope.btnTitle = "Save";
        }

        $scope.onSave = function(form){
            if (isNew){
                if(form.$valid){
                    userService.createUser($scope.appUser).then(function(){
                        $scope.$parent.currentUser = $scope.appUser;
                        $scope.saveMessage = "Create user successfully!";
                        $scope.isShowMessage = true;

                        $scope.$parent.connected = true;
                        var now = new $window.Date(),
                        // this will set the expiration to 1 day
                            exp = new $window.Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

                        $cookieStore.put('currentUser',$scope.appUser,{
                            expires: exp
                        });

                        $location.path('/home');
                    }, function () {
                        $scope.saveMessage = "Create user fail";
                        $scope.isShowMessage = true;
                    });
                }
            } else{
                userService.updateUser($scope.appUser).then(function () {
                    $scope.$parent.currentUser = $scope.appUser;
                    var now = new $window.Date(),
                    // this will set the expiration to 1 day
                        exp = new $window.Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

                    $cookieStore.put('currentUser',$scope.appUser,{
                        expires: exp
                    });


                    $scope.saveMessage = "Update user successfully!";
                    $scope.isShowMessage = true;
                }, function () {
                    $scope.saveMessage = "Update user fail";
                    $scope.isShowMessage = true;
                });
            }
        }

    }
    angular.module('recipesApp').controller('userManagerCtrl', ['$scope', 'userService', 'isNew', '$window', '$location', '$cookieStore', userManagerCtrl])
})();