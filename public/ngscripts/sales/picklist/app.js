var app = angular.module('salesPickListApp',['serviceApp.reference','ui.router','ngResource','salesPickListApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesPickList',{
        url:'/sales/picklist/list',
        templateUrl:'/sales/picklist/list',
        controller:'SalesPickListController'
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
