var app = angular.module('productApp',['datatables','ngTable','ui.router','ngResource','productApp.controllers','productApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('products',{
        url:'/products/list',
        templateUrl:'/products/list',
        controller:'ProductListController'
    }).state('viewProduct',{
       url:'/products/view',
       templateUrl:'products/view',
       controller:'ProductViewController'
    }).state('newProduct',{
        url:'/products/add',
        templateUrl:'products/add',
        controller:'ProductCreateController'
    }).state('editProduct',{
        url:'/products/edit',
        templateUrl:'products/edit',
        controller:'ProductEditController'
    });
}).run(function($state){
   $state.go('products');
});
