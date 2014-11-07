angular.module('customerApp.controllers',['ngTable'])
.controller('customerListController',function($scope,$state,popupService,$window,customer,ngTableParams, $filter){

	var data = [
                {
                	category: "Regular", 
                	type: "Suki", 
                	name: "Moroni", 
                	tradename: "Landmark", 
                	branch: "Makati", 
                	tin: "0112233", 
                	phone: 09221501111, 
                	website: "ace.com", 
                	email: "ace@ace", 
                	sec: "123456", 
                	creditLimit: 222, 
                	transactionLimit: 3, 
                	paymentTerm: "cash", 
                	shippingMode: "LBC", 
                	commission: 12, 
                	priceType: 12, 
                	tin: "12312", 
                	status: "Active", 
                },
                {
                	category: "Regular", 
                	type: "Suki", 
                	name: "Moroni", 
                	tradename: "Landmark", 
                	branch: "Makati", 
                	tin: "0112233", 
                	phone: 09221501111,
                	website: "ace.com", 
                	email: "ace@ace", 
                	sec: "123456", 
                	creditLimit: 222, 
                	transactionLimit: 3, 
                	paymentTerm: "cash", 
                	shippingMode: "LBC", 
                	commission: 12, 
                	priceType: 12, 
                	tin: "12312", 
                	status: "Active", 
                }
                ];
	
	$scope.customers = data;
		
	
//  $scope.customers=customer.query();
	
    $scope.deletecustomer = function(customer){
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

    $scope.addcustomer=function(){
        $scope.customer.$save(function(){
            $state.go('customers');
        });
    }

}).controller('customerEditController',function($scope,$state,$stateParams,customer){

    $scope.updatecustomer=function(){
        $scope.customer.$update(function(){
            $state.go('customers');
        });
    };

    $scope.loadcustomer=function(){
        $scope.customer=customer.get({id:$stateParams.id});
    };

    $scope.loadcustomer();
});