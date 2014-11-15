angular.module('adjustmentApp.services',[]).factory('Adjustment',function($resource){
    return $resource('/api/adjustments/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
