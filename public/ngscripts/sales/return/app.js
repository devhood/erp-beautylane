var app = angular.module('salesReturnApp',['serviceApp.reference','ui.router','ngResource','salesReturnApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesReturn',{
        url:'/sales/return/list',
        templateUrl:'/sales/return/list',
        controller:'SalesReturnListController'
    }).state('viewSalesReturn',{
       url:'/sales/return/view/:id',
       templateUrl:'/sales/return/view',
       controller:'SalesReturnViewController'
    }).state('newSalesReturn',{
        url:'/sales/return/add',
        templateUrl:'/sales/return/add',
        controller:'SalesReturnCreateController'
    }).state('editSalesReturn',{
        url:'/sales/return/edit/:id',
        templateUrl:'/sales/return/edit',
        controller:'SalesReturnEditController'
    });

}).run(function($state){

});
