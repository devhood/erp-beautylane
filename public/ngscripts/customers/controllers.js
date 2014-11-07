angular.module('customerApp.controllers',['ngTable'])
.controller('customerListController',function($scope,$state,popupService,$window,customer,ngTableParams, $filter){

	
	$scope.customers = data;
		
	
  $scope.customers=customer.query();
	
    $scope.deleteCustomer = function(customer){
        if(popupService.showPopup('Really delete this?')){
            customer.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('customerViewController',function($scope,$stateParams,customer){

    $scope.customer=customer.get({id:$stateParams.id});

}).controller('customerCreateController',function($scope,$state,$stateParams,customer){

    $scope.customer=new customer();

    $scope.addCustomer=function(){
        $scope.customer.$save(function(){
            $state.go('customers');
        });
    }

}).controller('customerEditController',function($scope,$state,$stateParams,customer){

    $scope.updateCustomer=function(){
        $scope.customer.$update(function(){
            $state.go('customers');
        });
    };

    $scope.loadCustomer=function(){
        $scope.customer=customer.get({id:$stateParams.id});
    };

    $scope.loadCustomer();
});