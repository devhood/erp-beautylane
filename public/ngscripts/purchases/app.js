var app = angular.module('purchaseApp',['ngTable','ui.router','ngResource','purchaseApp.controllers','purchaseApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('purchases',{
        url:'/purchases/list',
        templateUrl:'/purchases/list',
        controller:'PurchaseListController'
    }).state('viewPurchase',{
       url:'/purchases/view',
       templateUrl:'purchases/view',
       controller:'PurchaseViewController'
    }).state('newPurchase',{
        url:'/purchases/add',
        templateUrl:'purchases/add',
        controller:'PurchaseCreateController'
    }).state('editPurchase',{
        url:'/purchases/edit',
        templateUrl:'purchases/edit',
        controller:'PurchaseEditController'
    }).state('approvePurchase',{
        url:'/purchases/approve',
        templateUrl:'purchases/approve',
        controller:'PurchaseApproveController'
    });
}).run(function($state){
   $state.go('purchases');
});
