angular.module('userApp.controllers',[])
.controller('UserListController',function($scope,$state,popupService,$window,User, $filter){

	var data = [
                {fullname: "Moroni", username: 50, password: "Moroni", position: 50, email: "Moroni", mobile: 50,status: "Moroni"},
                {fullname: "Tiancum", username: 43, password: "Moroni", position: 50, email: "Moroni", mobile: 50,status: "Moroni"},
                {fullname: "Tiancum", username: 43, password: "Moroni", position: 50, email: "Moroni", mobile: 50,status: "Moroni"},
            ];
	
	$scope.users = data;
		
	
//  $scope.users=User.query();
	
    $scope.deleteUser = function(user){
        if(popupService.showPopup('Really delete this?')){
            user.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('UserViewController',function($scope,$stateParams,User){

    $scope.user=User.get({id:$stateParams.id});

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
}).controller('withBootstrapOptionsCtrl', function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder
    .fromSource('/api/users')
    // Add Bootstrap compatibility
    .withScroller()
    .withOption('deferRender', true)
        // Do not forget to add the scorllY option!!!
    .withOption('scrollY', 400)
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
        return '<a href="#/users/view", ui-sref="editUser" class="tooltips btn default" '+
        	'data-container="body", data-placement="top", '+
        	'data-html="true", data-original-title="View Record">' +
            '   <i class="fa fa-eye"></i>' +
            '</a>&nbsp;' +
            
            '<a href="#/users/edit", ui-sref="editUser" class="tooltips btn default" '+
        	'data-container="body", data-placement="top", '+
        	'data-html="true", data-original-title="Edit Record">' +
            '   <i class="fa fa-edit"></i>' +
            '</a>&nbsp;';
    })
];
});
