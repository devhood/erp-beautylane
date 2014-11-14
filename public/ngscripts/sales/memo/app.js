var app = angular.module('salesMemoApp',['serviceApp.reference','ui.router','ngResource','salesMemoApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesMemo',{
        url:'/sales/memo/list',
        templateUrl:'/sales/memo/list',
        controller:'SalesMemoListController'
    }).state('viewSalesMemo',{
       url:'/sales/memo/view/:id',
       templateUrl:'/sales/memo/view',
       controller:'SalesMemoViewController'
    }).state('newSalesMemo',{
        url:'/sales/memo/add',
        templateUrl:'/sales/memo/add',
        controller:'SalesMemoCreateController'
    }).state('editSalesMemo',{
        url:'/sales/memo/edit/:id',
        templateUrl:'/sales/memo/edit',
        controller:'SalesMemoEditController'
    });

}).run(function($state){

});
