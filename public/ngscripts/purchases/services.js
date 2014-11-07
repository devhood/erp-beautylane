angular.module('purchaseApp.services',[]).factory('Product',function($resource){
    return $resource('/api/purchases/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});