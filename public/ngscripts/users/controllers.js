angular.module('userApp.controllers',['ngTable'])
.controller('UserListController',function($scope,$state,popupService,$window,User,ngTableParams, $filter){

	var data = [
                {fullname: "Moroni", username: 50, password: "Moroni", position: 50, email: "Moroni", mobile: 50,status: "Moroni"},
                {fullname: "Tiancum", username: 43, password: "Moroni", position: 50, email: "Moroni", mobile: 50,status: "Moroni"},
                {fullname: "Tiancum", username: 43, password: "Moroni", position: 50, email: "Moroni", mobile: 50,status: "Moroni"},
            ];
	
	$scope.users = data;
		
	
//  $scope.users=User.query();
	
    $scope.deleteUser = function(user){
        if(popupService.showPopup('Really delete this?')){
            user.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('UserViewController',function($scope,$stateParams,User){

    $scope.movie=User.get({id:$stateParams.id});

}).controller('UserCreateController',function($scope,$state,$stateParams,User){

    $scope.user=new User();

    $scope.addUser=function(){
        $scope.user.$save(function(){
            $state.go('users');
        });
    }

}).controller('UserEditController',function($scope,$state,$stateParams,User){

    $scope.updateUser=function(){
        $scope.user.$update(function(){
            $state.go('users');
        });
    };

    $scope.loadUser=function(){
        $scope.user=User.get({id:$stateParams.id});
    };

    $scope.loadUser();
});