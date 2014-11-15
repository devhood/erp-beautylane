var app = angular.module('adjustmentApp',['serviceApp.reference','ui.router','ngResource','adjustmentApp.controllers','adjustmentApp.services']);

app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('adjustments',{
        url:'/adjustments/list',
        templateUrl:'/adjustments/list',
        controller:'AdjustmentListController'
    }).state('viewAdjustment',{
       url:'/adjustments/view/:id',
       templateUrl:'adjustments/view',
       controller:'AdjustmentViewController'
    }).state('newAdjustment',{
        url:'/adjustments/add',
        templateUrl:'adjustments/add',
        controller:'AdjustmentCreateController'
    }).state('editAdjustment',{
        url:'/adjustments/edit/:id',
        templateUrl:'adjustments/edit',
        controller:'AdjustmentEditController'
    }).state('approveAdjustment',{
        url:'/adjustments/approve/:id',
        templateUrl:'adjustments/approve',
        controller:'AdjustmentApproveController'
    });
}).run(function($state){

});
