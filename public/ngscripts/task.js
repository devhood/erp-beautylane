(function(){
var app = angular.module('task',[]);

app.controller('TaskController', function(){
	this.tasks = tasks;
});

	var tasks = [
{
	link: "#",
	task: "release",
	description: "New release v1.2",
	percent: "30%", 
	progress:{
				status: "progress-bar-warning",
	           width: "40%",
	           valuenow:"40",
	           valuemin:"0",
	           valuemax:"100",
			},
	info: "Incomplete"
},
{
	link: "#",
	task: "SO fix",
	description: "Sales Order approval",
	percent: "100%", 
	progress:{
				status:"progress-bar-success",
	           width: "100%",
	           valuenow:"40",
	           valuemax:"100",
			},
	info: "Complete"
},
{
	link: "#",
	task: "Return fix",
	description: "Returned Merchandise",
	percent: "10%", 
	progress:{
				status:"progress-bar-danger",
	           width: "100%",
	           valuenow:"40",
	           valuemax:"100",
			},
	info: "Unresolved"
}

    ];

})();
