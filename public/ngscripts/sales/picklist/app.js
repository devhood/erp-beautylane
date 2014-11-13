var app = angular.module('salesPickListApp',['serviceApp.reference','ui.router','ngResource','salesPickListApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesPickList',{
        url:'/sales/picklist/list',
        templateUrl:'/sales/picklist/list',
        controller:'SalesPickListController'
    });
}).run(function($state){

});
