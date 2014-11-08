var app = angular.module('salesOrderApp',['datatables','ngTable','ui.router','ngResource','salesOrderApp.controllers','salesOrderApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('sales/order',{
        url:'/sales/order/list',
        templateUrl:'/sales/order/list',
        controller:'SalesOrderListController'
    }).state('viewSales',{
       url:'/sales/order/view/:id',
       templateUrl:'sales/order/view',
       controller:'SalesOrderViewController'
    }).state('newSales',{
        url:'/sales/order/add',
        templateUrl:'sales/order/add',
        controller:'SalesOrderCreateController'
    }).state('editSales',{
        url:'/sales/order/edit/:id',
        templateUrl:'sales/order/edit',
        controller:'SalesOrderEditController'
    });
}).run(function($state){
   $state.go('sales/order');
});
