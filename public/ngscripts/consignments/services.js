angular.module('consignmentApp.services',[]).factory('Consignment',function($resource){
    return $resource('/api/consignments/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});