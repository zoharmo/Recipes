(function () {
    angular.module('categoriesModule', []);
    angular.module('recipesModule', []);
    angular.module('graphModule', []);

    var recipesApp = angular.module('recipesApp', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ngCookies', 'ngTouch', 'ui.grid.selection', 'categoriesModule','recipesModule','graphModule']);
    recipesApp.config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        // $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider
            .when('/', {
                controller: 'usersManagerGridCtrl',
                templateUrl: 'views/home.html'
            })
            .when('/login', {
                //   controller: 'usersManagerGridCtrl',
                templateUrl: 'views/login.html'
            })
            .when('/register', {
                controller: 'userManagerCtrl',
                templateUrl: 'views/userDetails.html',
                resolve: {
                    isNew: function () {
                        return true;
                    }
                }
            })
            .when('/myProfile', {
                controller: 'userManagerCtrl',
                templateUrl: 'views/userDetails.html',
                resolve: {
                    isNew: function () {
                        return false;
                    }
                }
            })
            .when('/usersManager', {
                controller: 'usersGridCtrl',
                templateUrl: 'views/usersManager.html',
                resolve: {
                    allUsers: function (userService) {
                        return userService.getAll();
                    }
                }
            })
            .when('/users/:email/recipes', {
                controller: 'viewRecipesCtrl',
                templateUrl: '/views/recipes.html'
            })
            .when('/categories/:categoryId/recipes', {
                controller: 'viewRecipesCtrl',
                templateUrl: '/views/recipes.html'
            })
            .when('/recipesSearch', {
                controller: 'recipesSearchCtrl',
                templateUrl: '/views/recipesSearch.html'
            })
            .when('/recipes', {
                controller: 'viewRecipesCtrl',
                templateUrl: '/views/recipes.html'
            })
            .when('/createRecipe', {
                controller: 'createRecipeCtrl',
                templateUrl: '/views/createRecipe.html'
            })
            .when('/userRecipes', {
                controller: 'userRecipesGraphCtrl',
                templateUrl: '/views/userRecipesGraph.html'
            })
            .when('/categoryRecipes', {
                controller: 'categoryRecipesPieCtrl',
                templateUrl: '/views/categoryRecipesPie.html'
            })
            .when('/about', {
                // controller: 'usersManagerGridCtrl',
                templateUrl: '/views/about.html'
            })
            .when('/contact', {
                // controller: 'usersManagerGridCtrl',
                templateUrl: '/views/contact.html'
            })
            .when('/recipeDetails/:recipeId', {
                controller: 'recipeDetailsCtrl',
                templateUrl: '/views/recipeDetails.html'
            })
            .when('/categories', {
                controller: 'categoriesCtrl',
                templateUrl: '/views/categories.html'
            })
            .when('/createCategory', {
                controller: 'categoryFormCtrl',
                templateUrl: '/views/categories/categoryForm.html'
            })
            .when('/editCategory', {
                controller: 'categoryFormCtrl',
                templateUrl: '/views/categories/categoryForm.html'
            })
            .when('/editCategory/:id', {
                controller: 'categoryFormCtrl',
                templateUrl: '/views/categories/categoryForm.html'
            })
            .when('/removeCategory', {
                controller: 'categoryFormCtrl',
                templateUrl: '/views/categories.html'
            })
            .when('/categoryRecipes/:name', {
                controller: 'categoryRecipesCtrl',
                templateUrl: '/views/categoryRecipes.html'
            })
            .when('/addIngredients', {
                controller: 'addIngredientsCtrl',
                templateUrl: 'views/addIngredients.html'
            })
            .when('/myIngredients', {
                controller: 'myIngredientsCtrl',
                templateUrl: 'views/myIngredients.html'
            })
            .otherwise({
                templateUrl: 'views/home.html'
            });
    })
})();





