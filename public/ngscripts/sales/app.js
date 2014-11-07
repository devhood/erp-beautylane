var app = angular.module('salesApp',['datatables','ngTable','ui.router','ngResource','salesApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('sales/order',{
        url:'/sales/order/list',
        templateUrl:'/sales/order/list',
        controller:'OrderListController'
    }).state('viewSales',{
       url:'/sales/order/view',
       templateUrl:'sales/order/view',
       controller:'OrderViewController'
    }).state('newSales',{
        url:'/sales/order/add',
        templateUrl:'sales/order/add',
        controller:'OrderCreateController'
    }).state('editSales',{
        url:'/sales/order/edit',
        templateUrl:'sales/order/edit',
        controller:'OrderEditController'
    });
}).run(function($state){
   $state.go('sales/order');
});
