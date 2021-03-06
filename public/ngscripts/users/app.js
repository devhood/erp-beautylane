var app = angular.module('userApp',['serviceApp.reference','datatables', 'ui.bootstrap','userApp.controllers','userApp.services']);


app.config(function($stateProvider,$httpProvider){
    $stateProvider.state('users',{
        url:'/users/list',
        templateUrl:'/users/list',
        controller:'UserListController'
    }).state('viewUser',{
       url:'/users/view/:id',
       templateUrl:'users/view',
       controller:'UserViewController'
    }).state('newUser',{
        url:'/users/add',
        templateUrl:'users/add',
        controller:'UserCreateController'
    }).state('editUser',{
        url:'/users/edit/:id',
        templateUrl:'users/edit',
        controller:'UserEditController'
    });
}).run(function($state){
   
});
