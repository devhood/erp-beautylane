angular.module('customerApp.controllers',[])
.controller('customerListController',function($scope,$state,popupService,$window,Customer,ngTableParams, $filter){

	
  $scope.customers=Customer.query() || [];
	
    $scope.deleteCustomer = function(customer){
        if(popupService.showPopup('Really delete this?')){
            customer.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('customerViewController',function($scope,$stateParams,Customer){

    $scope.customer=Customer.get({id:$stateParams.id});

}).controller('customerCreateController',function($scope,$state,$stateParams,Customer){

    $scope.customer=new Customer();

    $scope.addCustomer=function(){
        $scope.customer.$save(function(){
            $state.go('customers');
        });
    }

}).controller('customerEditController',function($scope,$state,$stateParams,Customer){

    $scope.updateCustomer=function(){
        $scope.customer.$update(function(){
            $state.go('customers');
        });
    };

    $scope.loadCustomer=function(){
        $scope.customer=Customer.get({id:$stateParams.id});
    };

    $scope.loadCustomer();
});