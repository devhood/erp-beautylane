angular.module('shipmentApp.controllers',['ngTable'])
.controller('ShipmentListController',function($scope,$state,popupService,$window,Shipment,ngTableParams, $filter){




  $scope.shipments=Shipment.query();

    $scope.deleteShipment = function(shipment){
        if(popupService.showPopup('Really delete this?')){
            shipment.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('ShipmentViewController',function($scope,$stateParams,Shipment){
    console.log($stateParams.id);
    $scope.shipment=Shipment.get({id:$stateParams.id});

}).controller('ShipmentCreateController',function($scope,$state,$stateParams,Shipment){

    $scope.shipment=new Shipment();

    $scope.addShipment=function(){
        $scope.shipment.$save(function(){
            $state.go('shipments');
        });
    }

}).controller('ShipmentEditController',function($scope,$state,$stateParams,Shipment){

    $scope.updateShipment=function(){
        $scope.shipment.$update(function(){
            $state.go('shipments');
        });
    }

}).controller('ShipmentApproveController',function($scope,$state,$stateParams,Shipment){

    $scope.updateShipment=function(){
        $scope.shipment.$update(function(){
            $state.go('shipments');
        });
    };

    $scope.loadShipment=function(){
        $scope.shipment=Shipment.get({id:$stateParams.id});
    };

    $scope.loadShipment();
});
