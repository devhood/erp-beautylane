var app = angular.module('salesDeliveryApp',['datatables', 'ui.bootstrap','salesDeliveryApp.controllers','salesApp.services']);

app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('sales/delivery',{
        url:'/sales/delivery/list',
        templateUrl:'/sales/delivery/list',
        controller:'SalesDeliveryListController'
    }).state('viewSalesDelivery',{
       url:'/sales/delivery/view/:id',
       templateUrl:'sales/delivery/view',
       controller:'SalesDeliveryViewController'
    }).state('newSalesDelivery',{
        url:'/sales/delivery/add',
        templateUrl:'sales/delivery/add',
        controller:'SalesDeliveryCreateController'
    }).state('editSalesDelivery',{
        url:'/sales/delivery/edit/:id',
        templateUrl:'sales/delivery/edit',
        controller:'SalesDeliveryEditController'
    });
}).run(function($state){
   $state.go('sales/delivery');
});
