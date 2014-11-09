var app = angular.module('customerApp',['serviceApp.reference','ui.router','ngResource','customerApp.controllers','customerApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('customers',{
        url:'/customers/list',
        templateUrl:'/customers/list',
        controller:'CustomerListController'
    }).state('viewCustomer',{
       url:'/customers/view',
       templateUrl:'customers/view',
       controller:'CustomerViewController'
    }).state('newCustomer',{
        url:'/customers/add',
        templateUrl:'customers/add',
        controller:'CustomerCreateController'
    }).state('editCustomer',{
        url:'/customers/edit',
        templateUrl:'customers/edit',
        controller:'CustomerEditController'
    });
}).run(function($state){
   $state.go('customers');
});
