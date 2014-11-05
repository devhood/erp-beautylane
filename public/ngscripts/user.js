(function(){
var app = angular.module('user',[]);

app.controller('userController', function(){
	this.user = user;
});

var user = {
	username:"Ace Besmonte",
	photo:"assets/img/avatar1_small.jpg",
	profileUrl: "extra_profile.html",
	calendarUrl: "page_calendar.html",
	inboxUrl: "https://www.facebook.com/messages",
	taskUrl: "task.html",
	lockScreen: "",
	logout: "https://www.facebook.com/logout.php"

};
})();
