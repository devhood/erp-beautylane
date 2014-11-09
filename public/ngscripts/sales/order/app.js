var app = angular.module('salesOrderApp',['serviceApp.reference','datatables', 'ui.bootstrap','salesOrderApp.controllers','salesApp.services']);

app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesOrder',{
        url:'/sales/order/list',
        templateUrl:'/sales/order/list',
        controller:'SalesOrderListController'
    }).state('viewSalesOrder',{
       url:'/sales/order/view/:id',
       templateUrl:'sales/order/view',
       controller:'SalesOrderViewController'
    }).state('newSalesOrder',{
        url:'/sales/order/add',
        templateUrl:'sales/order/add',
        controller:'SalesOrderCreateController'
    }).state('editSalesOrder',{
        url:'/sales/order/edit/:id',
        templateUrl:'sales/order/edit',
        controller:'SalesOrderEditController'
    });
}).run(function($state){
   $state.go('salesOrder');
});
