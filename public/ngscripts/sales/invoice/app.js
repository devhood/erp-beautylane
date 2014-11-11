var app = angular.module('salesInvoiceApp',['serviceApp.reference','ui.router','ngResource','salesInvoiceApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesInvoice',{
        url:'/sales/invoice/list',
        templateUrl:'/sales/invoice/list',
        controller:'SalesInvoiceListController'
    });
    /*.state('viewSalesOrder',{
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
