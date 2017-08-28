
angular.module('recipesApp').factory('categoriesService', function ($http) {

    return {
        get: function(key) { // get by id 
            return $http.get('/api/dataservice/GetCategory/' + key).then(function (response) {
               return response.data[0]; // TODO - why et array ... name is uniqe
            });
        },
        set: function(value) { // set by id
            return $http.put('/api/dataservice/EditCategory',value);

            // sessionStorage.setItem(key, JSON.stringify(value));
        },
        remove: function(key) { // remove by id
            return $http.delete('/api/dataservice/DeleteCategory/' + key);
        },
        uploadImage:function(fileData){
            return   $http.post('/api/dataservice/UploadCategoryImage', fileData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },
        saveData: function (formData) {
                    console.log("upload sucess")
                    return $http.post('/api/dataservice/CreateCategory', formData);
        },
        getAll: function () {
            return $http.get('/api/dataservice/GetAllCategories');
        }
    };
});

//
// (function(){
//     "use strict";
//     function categoriesService($http){
//         this.getAll = function(){
//             return $http.get('/api/dataservice/GetAllCategories');
//         };
//
//     }
//
//     angular.module('recipesApp').service('categoriesService', ['$http', categoriesService]);
// })();
