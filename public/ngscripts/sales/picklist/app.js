var app = angular.module('salesPickListApp',['serviceApp.reference','ui.router','ngResource','salesPickListApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesPickList',{
        url:'/sales/picklist/list',
        templateUrl:'/sales/picklist/list',
        controller:'SalesPickListController'
      }).state('newPicklist',{
        url:'/sales/picklist/add',
        templateUrl:'/sales/picklist/add',
        controller:'SalesPickListCreateController'
      }).state('editPicklist',{
        url:'/sales/picklist/edit',
        templateUrl:'/sales/picklist/edit',
        controller:'SalesPickListEditController'
      }).state('viewPicklist',{
        url:'/sales/picklist/view',
        templateUrl:'/sales/picklist/view',
        controller:'SalesPickListViewController'
    });
}).run(function($state){

});
