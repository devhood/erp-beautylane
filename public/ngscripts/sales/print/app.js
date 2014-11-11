var app = angular.module('salesPrintApp',['serviceApp.reference','ui.router','ngResource','salesPrintApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesPrint',{
        url:'/sales/print/list',
        templateUrl:'/sales/print/list',
        controller:'SalesPrintListController'
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
