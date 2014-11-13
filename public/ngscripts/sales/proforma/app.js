var app = angular.module('salesProformaApp',['serviceApp.reference','ui.router','ngResource','salesProformaApp.controllers','salesApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('salesProforma',{
        url:'/sales/proforma/list',
        templateUrl:'/sales/proforma/list',
        controller:'SalesProformaListController'
    }).state('viewSalesProforma',{
       url:'/sales/proforma/view/:id',
       templateUrl:'/sales/proforma/view',
       controller:'SalesProformaViewController'
    }).state('newSalesProforma',{
        url:'/sales/proforma/add',
        templateUrl:'/sales/proforma/add',
        controller:'SalesProformaCreateController'
    }).state('editSalesProforma',{
        url:'/sales/proforma/edit/:id',
        templateUrl:'/sales/proforma/edit',
        controller:'SalesProformaEditController'
    });
}).run(function($state){

});
