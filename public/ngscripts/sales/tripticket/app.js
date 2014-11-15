var app = angular.module('salesTripTicketApp',['serviceApp.reference','ui.router','ngResource','salesTripTicketApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesTripTicket',{
        url:'/sales/tripticket/list',
        templateUrl:'/sales/tripticket/list',
        controller:'SalesTripTicketListController'
    }).state('viewSalesTripticket',{
       url:'/sales/tripticket/view/:id',
       templateUrl:'/sales/tripticket/view',
       controller:'SalesTripTicketViewController'
    }).state('newSalesTripticket',{
        url:'/sales/tripticket/add',
        templateUrl:'/sales/tripticket/add',
        controller:'SalesTripticketCreateController'
    }).state('editSalesTripticket',{
        url:'/sales/tripticket/edit/:id',
        templateUrl:'/sales/tripticket/edit',
        controller:'SalesTripticketEditController'
    });

}).run(function($state){

});
