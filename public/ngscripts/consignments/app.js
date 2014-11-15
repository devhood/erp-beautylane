var app = angular.module('consignmentApp',['serviceApp.reference','ui.router','ngResource','consignmentApp.controllers','consignmentApp.services']);

app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('consignments',{
        url:'/consignments/list',
        templateUrl:'/consignments/list',
        controller:'ConsignmentListController'
    }).state('viewConsignment',{
       url:'/consignments/view/:id',
       templateUrl:'consignments/view',
       controller:'ConsignmentViewController'
    }).state('newConsignment',{
        url:'/consignments/add',
        templateUrl:'consignments/add',
        controller:'ConsignmentCreateController'
    }).state('editConsignment',{
        url:'/consignments/edit/:id',
        templateUrl:'consignments/edit',
        controller:'ConsignmentEditController'
    }).state('approveConsignment',{
        url:'/consignments/approve/:id',
        templateUrl:'consignments/approve',
        controller:'ConsignmentApproveController'
    });
}).run(function($state){

});
