var app = angular.module('customerApp',['ngTable','ui.router','ngResource','customerApp.controllers','customerApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('customers',{
        url:'/customers/list',
        templateUrl:'/customers/list',
        controller:'customerListController'
    }).state('viewcustomer',{
       url:'/customers/view',
       templateUrl:'customers/view',
       controller:'customerViewController'
    }).state('newcustomer',{
        url:'/customers/add',
        templateUrl:'customers/add',
        controller:'customerCreateController'
    }).state('editcustomer',{
        url:'/customers/edit',
        templateUrl:'customers/edit',
        controller:'customerEditController'
    });
}).run(function($state){
   $state.go('customers');
});
