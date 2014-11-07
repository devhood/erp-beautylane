angular.module('purchaseApp.controllers',['ngTable'])
.controller('PurchaseListController',function($scope,$state,popupService,$window,Purchase,ngTableParams, $filter){

  $scope.purchases=Purchase.query();

    $scope.deletePurchase = function(purchase){
        if(popupService.showPopup('Really delete this?')){
            purchase.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('PurchaseViewController',function($scope,$stateParams,Purchase){
    console.log($stateParams.id);
    $scope.purchase=Purchase.get({id:$stateParams.id});

}).controller('PurchaseCreateController',function($scope,$state,$stateParams,Purchase){

    $scope.purchase=new Purchase();

    $scope.addPurchase=function(){
        $scope.purchase.$save(function(){
            $state.go('purchases');
        });
    }

}).controller('PurchaseEditController',function($scope,$state,$stateParams,Purchase){

    $scope.updatePurchase=function(){
        $scope.purchase.$update(function(){
            $state.go('purchases');
        });
    }
}).controller('PurchaseApproveController',function($scope,$state,$stateParams,Purchase){

    $scope.updatePurchase=function(){
        $scope.purchase.$update(function(){
            $state.go('purchases');
        });
    };

    $scope.loadPurchase=function(){
        $scope.purchase=Purchase.get({id:$stateParams.id});
    };

    $scope.loadPurchase();
});
