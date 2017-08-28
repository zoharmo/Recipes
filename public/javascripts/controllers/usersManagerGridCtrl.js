(function(){
    "use strict";
    function usersManagerGridCtrl($scope,$location, userService,$cookies,$cookieStore,$window){
        var self = this;

        $scope.connected = false;
        $scope.currentUser = {};

        if (!_.isEmpty($cookieStore.get('currentUser'))){
            $scope.connected = true;
            $scope.currentUser = $cookieStore.get('currentUser');
        }
        $scope.menu = [
            {label: 'Home', route: '#/'},
            {label: 'DNA', route: '#/dna'},
            {label: 'Dna-list', route: '#/dna-list'},
            {label: 'Admin', route: '#/admin'}

        ]

        $scope.popularUsers = [{'userName': "Yarden Davidof"
            //  , 'password': "1234"// nameGenderHost[1]
            , 'email': "yardo.david@gmail.com"//nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3]
            , 'isAdmin': true// addresses[i]
            , 'gender': "F"},
            {'userName': "Gal Cohen"
            //  , 'password': "1234"// nameGenderHost[1]
            , 'email': "galcohen92@gmail.com"//nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3]
            , 'isAdmin': true// addresses[i]
            , 'gender': "M"}];


        $scope.login = function(){
            // Check if valid
            var userMail = $("#loginForm :input[name='userMail']").val();
            var userPassword = $("#loginForm :input[name='userPassword']").val();

            userService.getUser(userMail, userPassword).then(function(data) {
                    if (!_.isEmpty(data.data)){
                        $scope.currentUser = data.data;
                        $scope.connected = true;
                        var now = new $window.Date(),
                            // this will set the expiration to 1 day
                            exp = new $window.Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

                        $cookieStore.put('currentUser',data.data,{
                            expires: exp
                        });

                       $location.path('/home');
                    }else{
                        $scope.isShowError = true;
                    }
                },
                 function () {
                     console.log("error when try to get user");
                });
        }

        $scope.logout = function () {
            $scope.currentUser = {};
            $scope.connected = false;
            $cookieStore.remove('currentUser');
        }

    }
    angular.module('recipesApp').controller('usersManagerGridCtrl', ['$scope', '$location', 'userService', '$cookies', '$cookieStore', '$window', usersManagerGridCtrl])
})();