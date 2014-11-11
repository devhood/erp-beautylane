var app = angular.module('salesReturnApp',['serviceApp.reference','ui.router','ngResource','salesReturnApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesReturn',{
        url:'/sales/return/list',
        templateUrl:'/sales/return/list',
        controller:'SalesReturnListController'
    });
/*
    .state('viewSalesOrder',{
       url:'/sales/order/view/:id',
       templateUrl:'/sales/order/view',
       controller:'SalesOrderViewController'
    }).state('newSalesOrder',{
        url:'/sales/order/add',
        templateUrl:'/sales/order/add',
        controller:'SalesOrderCreateController'
    }).state('editSalesOrder',{
        url:'/sales/order/edit/:id',
        templateUrl:'/sales/order/edit',
        controller:'SalesOrderEditController'
    });
*/
}).run(function($state){

});
