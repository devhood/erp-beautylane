var app = angular.module('userApp',['ui.router','ngResource','userApp.controllers','userApp.services']);

app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('users',{
        url:'/users',
        templateUrl:'partials/movies.html',
        controller:'MovieListController'
    }).state('viewMovie',{
       url:'/users/:id/view',
       templateUrl:'partials/movie-view.html',
       controller:'MovieViewController'
    }).state('newMovie',{
        url:'/movies/new',
        templateUrl:'partials/movie-add.html',
        controller:'MovieCreateController'
    }).state('editMovie',{
        url:'/movies/:id/edit',
        templateUrl:'partials/movie-edit.html',
        controller:'MovieEditController'
    });
}).run(function($state){
   $state.go('movies');
});