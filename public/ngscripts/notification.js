(function(){
var app = angular.module('notification',[]);

app.controller('NotificationController', function(){
	this.notifications = notifications;
});

var notifications = [
     {
        link : "#",
        icon : "fa-plus",
        message : "New user registered.",
        createdOn : Date.now(),
        status : "label-success"
     },
     {
         link : "#",
         icon : "fa-plus",
         message : "New Sales Order.",
         createdOn : Date.now(),
         status : "label-success"
      },
      {
          link : "#",
          icon : "fa-plus",
          message : "New Delivery Order.",
          createdOn : Date.now(),
          status : "label-success"
       },
       {
           link : "#",
           icon : "fa-plus",
           message : "New Sales Invoice.",
           createdOn : Date.now(),
           status : "label-success"
        },
        {
            link : "#",
            icon : "fa-plus",
            message : "New Returned Merchandise.",
            createdOn : Date.now(),
            status : "label-danger"
         }
];
})();
