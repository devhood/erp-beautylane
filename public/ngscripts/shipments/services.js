angular.module('shipmentApp.services',[]).factory('Shipment',function($resource){
    return $resource('/api/shipments/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});