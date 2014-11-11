var app = angular.module('salesDeliveryApp',['serviceApp.reference','ui.router','ngResource','salesDeliveryApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesDelivery',{
        url:'/sales/delivery/list',
        templateUrl:'/sales/delivery/list',
        controller:'SalesDeliveryListController'
    }).state('viewSalesDelivery',{
       url:'/sales/delivery/view/:id',
       templateUrl:'/sales/delivery/view',
       controller:'SalesDeliveryViewController'
    }).state('editSalesDelivery',{
        url:'/sales/delivery/approve/:id',
        templateUrl:'/sales/delivery/approve',
        controller:'SalesDeliveryEditController'
    });

}).run(function($state){
  
});
