var app = angular.module('salesPaymentApp',['serviceApp.reference','ui.router','ngResource','salesPaymentApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesPayment',{
        url:'/sales/payment/list',
        templateUrl:'/sales/payment/list',
        controller:'SalesPaymentListController'
    }).state('viewSalesPayment',{
       url:'/sales/payment/view/:id',
       templateUrl:'/sales/payment/view',
       controller:'SalesPaymentViewController'
    }).state('editSalesPayment',{
        url:'/sales/payment/approve/:id',
        templateUrl:'/sales/payment/approve',
        controller:'SalesPaymentEditController'
    });
}).run(function($state){

});
