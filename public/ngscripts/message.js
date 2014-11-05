(function(){
var app = angular.module('message',[]);

app.controller('MessageController', function(){
	this.messages = messages;
});

var messages = [
    {
    	link:"",
    	photo:"./assets/img/avatar2.jpg",
    	name: "Lina Yo",
    	info: "You have pending approval.",
    	createdOn: Date.now()
    },
    {
			link:"",
			photo:"./assets/img/avatar3.jpg",
			name: "Lester Jen",
			info: "You have been summoned.",
			createdOn: Date.now()
    }
    ];

})();
