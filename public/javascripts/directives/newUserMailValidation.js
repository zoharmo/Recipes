'use strict';
angular
    .module('recipesApp')
    .directive('newUserMailValidation', ['userService', '$q', '$timeout', function(userService, $q, $timeout) {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attr, model) {
                model.$asyncValidators.emailExists = function() {

                    //here you should access the backend, to check if username exists
                    //and return a promise
                    //here we're using $q and $timeout to mimic a backend call
                    //that will resolve after 1 sec

                    var defer = $q.defer();
                   // defer.add()
                    userService.isUserExist(model.$viewValue).then(function(data){
                        defer.resolve(!data.data);
                      //  model.$setValidity('emailExists', !data.data);
                    });
                    $timeout(function(){
                        userService.isUserExist(model.$viewValue).then(function(data){
                            model.$setValidity('emailExists', !data.data);

                            defer.resolve();
                            //  model.$setValidity('emailExists', !data.data);
                        });

                    }, 1000);
                    return defer.promise;
                };
            }
        };
    }]);
