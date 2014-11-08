var app = angular.module('salesInvoiceApp',['datatables', 'ui.bootstrap','salesInvoiceApp.controllers','salesApp.services']);

app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('sales/invoice',{
        url:'/sales/invoice/list',
        templateUrl:'/sales/invoice/list',
        controller:'SalesInvoiceListController'
    }).state('viewSalesInvoice',{
       url:'/sales/invoice/view/:id',
       templateUrl:'sales/invoice/view',
       controller:'SalesInvoiceViewController'
    }).state('newSalesInvoice',{
        url:'/sales/invoice/add',
        templateUrl:'sales/invoice/add',
        controller:'SalesInvoiceCreateController'
    }).state('editSalesInvoice',{
        url:'/sales/invoice/edit/:id',
        templateUrl:'sales/invoice/edit',
        controller:'SalesInvoiceEditController'
    });
}).run(function($state){
   $state.go('sales/invoice');
});
