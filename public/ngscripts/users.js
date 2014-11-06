(function(){
var app = angular.module('users',[]);

app.provider('User', function(){
	this.$get = ['$resource', function($resource){
		var User = $resource('/api/post/:id',{},{
			update: {
				method: 'PUT'
			}
		});
		return User;
	}];
});
app.controller('UsersController', ['$http', function(){
	var erp = this;
	this.users = [];
	$http.get('/api/users').success(function(data){
		erp.users = data;
	});
	this.addUsers = function(user){
		erp.users.push();
	};
}]);

})();
