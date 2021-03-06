var app = angular.module('shipmentApp',['datatables','ngTable','ui.router','ngResource','shipmentApp.controllers','shipmentApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('shipments',{
        url:'/shipments/list',
        templateUrl:'/shipments/list',
        controller:'ShipmentListController'
    }).state('viewShipment',{
       url:'/shipments/view/:id',
       templateUrl:'/shipments/view',
       controller:'ShipmentViewController'
    }).state('newShipment',{
        url:'/shipments/add',
        templateUrl:'/shipments/add',
        controller:'ShipmentCreateController'
    }).state('editShipment',{
        url:'/shipments/edit/:id',
        templateUrl:'/shipments/edit',
        controller:'ShipmentEditController'
    }).state('approveShipment',{
        url:'/shipments/approve/:id',
        templateUrl:'/shipments/approve',
        controller:'ShipmentApproveController'
    });
}).run(function($state){

});
