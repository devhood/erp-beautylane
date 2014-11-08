angular.module('userApp.controllers',[])
.controller('UserListController',function($scope,$state,popupService,$window,User, $filter, DTOptionsBuilder, DTColumnBuilder){

    $scope.dtOptions = DTOptionsBuilder
    .fromSource('/api/users')
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
    // Add Table tools compatibility
    .withTableTools('/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf')
    .withTableToolsButtons([
        'pdf',
        'xls',
    ]);


	$scope.dtColumns = [
	    DTColumnBuilder.newColumn('fullname').withTitle('Fullname'),
	    DTColumnBuilder.newColumn('username').withTitle('Username'),
	    DTColumnBuilder.newColumn('position').withTitle('Position'),
	    DTColumnBuilder.newColumn('phone').withTitle('Phone'),
	    DTColumnBuilder.newColumn('email').withTitle('Email'),
	    DTColumnBuilder.newColumn('status').withTitle('Status'),
	    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
	    .renderWith(function(data, type, full, meta) {
	        return '<a href="#/users/view/'+data._id+'", ui-sref="editUser" class="tooltips btn default" '+
	        	'data-container="body", data-placement="top", '+
	        	'data-html="true", data-original-title="View Record">' +
	            '   <i class="fa fa-eye"></i>' +
	            '</a>&nbsp;' +
	            
	            '<a href="#/users/edit/'+data._id+'"", ui-sref="editUser" class="tooltips btn default" '+
	        	'data-container="body", data-placement="top", '+
	        	'data-html="true", data-original-title="Edit Record">' +
	            '   <i class="fa fa-edit"></i>' +
	            '</a>&nbsp;';
	    })
	];

}).controller('UserViewController',function($scope,$stateParams,User){

	console.log($stateParams.id);
    $scope.user=User.get({id:$stateParams.id});
    console.log($scope.user);

}).controller('UserCreateController',function($scope,$state,$stateParams,User){

    $scope.user=new User();

    $scope.addUser=function(){
        $scope.user.$save(function(){
            $state.go('users');
        });
    }

}).controller('UserEditController',function($scope,$state,$stateParams,User){

    $scope.updateUser=function(){
        $scope.user.$update(function(){
            $state.go('users');
        });
    };

    $scope.loadUser=function(){
        $scope.user=User.get({id:$stateParams.id});
    };

    $scope.loadUser();
});
