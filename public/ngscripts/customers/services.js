angular.module('customerApp.services',[]).factory('Customer',function($resource){
    return $resource('/api/customers/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});