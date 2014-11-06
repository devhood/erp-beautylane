/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('movieApp',['ui.router','ngResource','movieApp.controllers','movieApp.services']);

angular.module('movieApp').config(function($stateProvider,$httpProvider){
    $stateProvider.state('movies',{
        url:'/movies',
        templateUrl:'/movieApp/partials/movies.html',
        controller:'MovieListController'
    }).state('viewMovie',{
       url:'/movies/:id/view',
       templateUrl:'/movieApp/partials/movie-view.html',
       controller:'MovieViewController'
    }).state('newMovie',{
        url:'/movies/new',
        templateUrl:'/movieApp/partials/movie-add.html',
        controller:'MovieCreateController'
    }).state('editMovie',{
        url:'/movies/:id/edit',
        templateUrl:'/movieApp/partials/movie-edit.html',
        controller:'MovieEditController'
    });
}).run(function($state){
   $state.go('movies');
});