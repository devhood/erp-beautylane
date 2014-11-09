angular.module('userApp.controllers',[])
.controller('UserListController',function($scope,$state,User, Api, $filter, DTOptionsBuilder, DTColumnBuilder){

    $scope.dtOptions = DTOptionsBuilder
    .fromSource("/api/users")
    // Add Bootstrap compatibility
    .withBootstrap()
    .withBootstrapOptions({
        TableTools: {
            classes: {
                container: 'btn-group',
                buttons: {
                    normal: 'btn default'
                }
            }
        },
       ColVis: {
            classes: {
                masterButton: 'btn default'
            }
        }
    })


    // Add ColVis compatibility
    .withColVis()
    .withColVisOption("buttonText","Columns")
    // Add Table tools compatibility
    .withTableTools('/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf')
    .withTableToolsButtons([
        'pdf',
        'xls',
    ]);

    $scope.dtOptions.sScrollX = "100%";
    $scope.dtOptions.sScrollXInner = "100%";
    $scope.dtOptions.bPaginate = false;
	$scope.dtColumns = [
	DTColumnBuilder.newColumn('fullname').withTitle('Fullname'),
	DTColumnBuilder.newColumn('username').withTitle('Username'),
	DTColumnBuilder.newColumn('position').withTitle('Position'),
	DTColumnBuilder.newColumn('phone').withTitle('Phone'),
	DTColumnBuilder.newColumn('email').withTitle('Email'),
	DTColumnBuilder.newColumn('status').withTitle('Status'),
	DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
	    .renderWith(function(data, type, full, meta) {
	        return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/users/view/'+data._id+'", ui-sref="editUser" class="tooltips btn default" '+
	        	'data-container="body", data-placement="top", '+
	        	'data-html="true", data-original-title="View Record">' +
	            '   <i class="fa fa-eye"></i>' +
	            '</a>&nbsp;' +

	            '<a href="#/users/edit/'+data._id+'", ui-sref="editUser" class="tooltips btn default" '+
	        	'data-container="body", data-placement="top", '+
	        	'data-html="true", data-original-title="Edit Record">' +
	            '   <i class="fa fa-edit"></i>' +
	            '</a>&nbsp;</div>';
	    })
	];

}).controller('UserViewController',function($scope,$stateParams,User, Api){


    $scope.user=User.get({id:$stateParams.id});
    

}).controller('UserCreateController',function($scope,$state,$stateParams,User,Api){

    $scope.user=new User();

    $scope.addUser=function(){
        $scope.user.$save(function(){
            $state.go('users');
        });
    }
   
 	
    $scope.positions = Api.Position.query();
    $scope.statuses = Api.UserStatus.query();

}).controller('UserEditController',function($scope,$window,popupService,$state,$stateParams,User,Api){

    $scope.updateUser=function(){
        console.log($scope.user);
        $scope.user.$update(function(){
            $state.go('users');
        });
    };

    $scope.deleteUser=function(user){
  	   if(popupService.showPopup('Really delete this?')){
  	       user.$delete(function(){
  	    	 $state.go('users');
  	      });
  	   }
  	};
  	
    $scope.loadUser=function(){
        $scope.user=User.get({id:$stateParams.id});
    };
    $scope.positions = Api.Position.query();
    $scope.statuses = Api.UserStatus.query();

    $scope.loadUser();
}).controller('UserLoginController',function($scope,$stateParams,User){


    $scope.user= {
    		username:"Ace Besmonte",
    		photo:"/assets/img/ace.jpg",
    		profileUrl: "extra_profile.html",
    		calendarUrl: "page_calendar.html",
    		inboxUrl: "https://www.facebook.com/messages",
    		taskUrl: "task.html",
    		lockScreen: "",
    		logout: "https://www.facebook.com/logout.php"
    	};

});
