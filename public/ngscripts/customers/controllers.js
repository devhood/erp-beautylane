angular.module('customerApp.controllers',[])
.controller('CustomerListController',function($scope,$state,popupService,$window,Customer,ngTableParams, $filter, DTOptionsBuilder, DTColumnBuilder){


		$scope.dtOptions = DTOptionsBuilder
		.fromSource('/api/customers')
		// Add Bootstrap compatibility
//	.withBootstrap()
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
			DTColumnBuilder.newColumn('category').withTitle('Category'),
			DTColumnBuilder.newColumn('type').withTitle('Type'),
			DTColumnBuilder.newColumn('company_name').withTitle('Company Name'),
			DTColumnBuilder.newColumn('phone').withTitle('Trade Name'),
			DTColumnBuilder.newColumn('branch').withTitle('Branch'),
			DTColumnBuilder.newColumn('tin').withTitle('TIN'),
			DTColumnBuilder.newColumn('phone').withTitle('Phone'),
			DTColumnBuilder.newColumn('email').withTitle('Email'),
			DTColumnBuilder.newColumn('website').withTitle('Website'),
			DTColumnBuilder.newColumn('sec_no').withTitle('SEC No'),
			DTColumnBuilder.newColumn('credit_limit').withTitle('Credit Limit'),
			DTColumnBuilder.newColumn('transaction_limit').withTitle('Transaction Limit'),
			DTColumnBuilder.newColumn('payment_term').withTitle('Payment Terms'),
			DTColumnBuilder.newColumn('shipping_mode').withTitle('Shipping Mode'),
			DTColumnBuilder.newColumn('percent_commission').withTitle('Percent Commission'),
			DTColumnBuilder.newColumn('sales_executive').withTitle('Sales Executive'),
			DTColumnBuilder.newColumn('price_type').withTitle('Price Type'),
			DTColumnBuilder.newColumn('customer_status').withTitle('Status'),
			DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
			.renderWith(function(data, type, full, meta) {
					return '<a href="#/customers/view", ui-sref="editCustomer" class="tooltips btn default" '+
						'data-container="body", data-placement="top", '+
						'data-html="true", data-original-title="View Record">' +
							'   <i class="fa fa-eye"></i>' +
							'</a>&nbsp;' +

							'<a href="#/customers/edit", ui-sref="editCustomer" class="tooltips btn default" '+
						'data-container="body", data-placement="top", '+
						'data-html="true", data-original-title="Edit Record">' +
							'   <i class="fa fa-edit"></i>' +
							'</a>&nbsp;';
			})
	];

}).controller('customerViewController',function($scope,$stateParams,Customer){

    $scope.customer=Customer.get({id:$stateParams.id});

}).controller('customerCreateController',function($scope,$state,$stateParams,Customer){

    $scope.customer=new Customer();

    $scope.addCustomer=function(){
        $scope.customer.$save(function(){
            $state.go('customers');
        });
    }

}).controller('customerEditController',function($scope,$state,$stateParams,Customer){

    $scope.updateCustomer=function(){
        $scope.customer.$update(function(){
            $state.go('customers');
        });
    };

    $scope.loadCustomer=function(){
        $scope.customer=Customer.get({id:$stateParams.id});
    };

    $scope.loadCustomer();
});
