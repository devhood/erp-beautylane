var app = angular.module('purchaseApp',['datatables','ngTable','ui.router','ngResource','purchaseApp.controllers','purchaseApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('purchases',{
        url:'/purchases/list',
        templateUrl:'/purchases/list',
        controller:'PurchaseListController'
    }).state('viewPurchase',{
       url:'/purchases/view/:id',
       templateUrl:'purchases/view',
       controller:'PurchaseViewController'
    }).state('newPurchase',{
        url:'/purchases/add',
        templateUrl:'purchases/add',
        controller:'PurchaseCreateController'
    }).state('editPurchase',{
        url:'/purchases/edit/:id',
        templateUrl:'purchases/edit',
        controller:'PurchaseEditController'
    }).state('approvePurchase',{
        url:'/purchases/approve/:id',
        templateUrl:'purchases/approve',
        controller:'PurchaseApproveController'
    });
}).run(function($state){

});
