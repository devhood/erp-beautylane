var app = angular.module('customerApp',['ngTable','ui.router','ngResource','customerApp.controllers','customerApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('customers',{
        url:'/customers/list',
        templateUrl:'/customers/list',
        controller:'customerListController'
    }).state('viewCustomer',{
       url:'/customers/view',
       templateUrl:'customers/view',
       controller:'customerViewController'
    }).state('newCustomer',{
        url:'/customers/add',
        templateUrl:'customers/add',
        controller:'customerCreateController'
    }).state('editCustomer',{
        url:'/customers/edit',
        templateUrl:'customers/edit',
        controller:'customerEditController'
    });
}).run(function($state){
   $state.go('customers');
});
