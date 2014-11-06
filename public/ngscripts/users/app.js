var app = angular.module('userApp',['ngTable','ui.router','ngResource','userApp.controllers','userApp.services']);

/*
app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('users',{
        url:'/users',
        templateUrl:'/users',
        controller:'MovieListController'
    }).state('viewUser',{
       url:'/users/:id/view',
       templateUrl:'users/add',
       controller:'MovieViewController'
    }).state('newUser',{
        url:'/users/new',
        templateUrl:'users/add',
        controller:'MovieCreateController'
    }).state('editUser',{
        url:'/users/:id/edit',
        templateUrl:'users/add',
        controller:'MovieEditController'
    });
}).run(function($state){
   $state.go('users');
});
*/