var app = angular.module('salesPaymentApp',['serviceApp.reference','ui.router','ngResource','salesPaymentApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesPayment',{
        url:'/sales/payment/list',
        templateUrl:'/sales/payment/list',
        controller:'SalesPaymentListController'
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
