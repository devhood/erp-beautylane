angular.module('salesApp.controllers',['ngTable'])
.controller('SalesListController',function($scope,$state,popupService,$window,Sales,ngTableParams, $filter){




  $scope.sales=Sales.query();

    $scope.deleteSales = function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('SalesViewController',function($scope,$stateParams,Sales){
    console.log($stateParams.id);
    $scope.sales=Sales.get({id:$stateParams.id});

}).controller('SalesCreateController',function($scope,$state,$stateParams,Sales){
    $scope.sales=new Sales();
    $scope.addSales=function(){
        $scope.sales.$save(function(){
            $state.go('sales');
        });
    }
}).controller('SalesEditController',function($scope,$state,$stateParams,Sales){
    $scope.updateSales=function(){
        $scope.sales.$update(function(){
            $state.go('sales');
        });
    };
    $scope.loadSales=function(){
        $scope.sales=Sales.get({id:$stateParams.id});
    };
    $scope.loadSales();
});
