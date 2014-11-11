var app = angular.module('salesMemoApp',['serviceApp.reference','ui.router','ngResource','salesMemoApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesMemo',{
        url:'/sales/memo/list',
        templateUrl:'/sales/memo/list',
        controller:'SalesMemoListController'
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
