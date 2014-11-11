var app = angular.module('salesInvoiceApp',['serviceApp.reference','ui.router','ngResource','salesInvoiceApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesInvoice',{
        url:'/sales/invoice/list',
        templateUrl:'/sales/invoice/list',
        controller:'SalesInvoiceListController'
    })
    .state('viewSalesInvoice',{
       url:'/sales/invoice/view/:id',
       templateUrl:'/sales/invoice/view',
       controller:'SalesInvoiceViewController'
    }).state('approveSalesInvoice',{
        url:'/sales/invoice/approve',
        templateUrl:'/sales/invoice/approve',
        controller:'SalesInvoiceApproveController'
    }).state('editSalesInvoice',{
        url:'/sales/invoice/edit/:id',
        templateUrl:'/sales/invoice/edit',
        controller:'SalesInvoiceEditController'
    });

}).run(function($state){

});
