angular.module('customerApp.controllers',[])
.controller('CustomerListController',function($scope,$state,popupService,$window,Customer, $filter, DTOptionsBuilder, DTColumnBuilder){

		$scope.dtOptions = DTOptionsBuilder
		.fromSource('/api/customers')
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
			DTColumnBuilder.newColumn('commission_sharing').withTitle('Percent Commission'),
			DTColumnBuilder.newColumn('sales_executive').withTitle('Sales Executive'),
			DTColumnBuilder.newColumn('price_type').withTitle('Price Type'),
			DTColumnBuilder.newColumn('status').withTitle('Status'),
			DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
			.renderWith(function(data, type, full, meta) {
					return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/customers/view/'+data._id+'", ui-sref="editCustomer" class="tooltips btn default" '+
						'data-container="body", data-placement="top", '+
						'data-html="true", data-original-title="View Record">' +
							'   <i class="fa fa-eye"></i>' +
							'</a>&nbsp;' +

							'<a href="#/customers/edit/'+data._id+'", ui-sref="editCustomer" class="tooltips btn default" '+
						'data-container="body", data-placement="top", '+
						'data-html="true", data-original-title="Edit Record">' +
							'   <i class="fa fa-edit"></i>' +
							'</a>&nbsp;</div>';
			})
	];

}).controller('CustomerViewController',function($scope,$stateParams,Customer){

    $scope.customer=Customer.get({id:$stateParams.id});

}).controller('CustomerCreateController',function($scope,$state,$stateParams,Customer,Api,User){

    $scope.customer=new Customer();

    $scope.addCustomer=function(){
        $scope.customer.$save(function(){
            $state.go('customers');
        });
    }
    $scope.types = Api.CustomerType.query();
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.shipping_modes = Api.ShippingMode.query();
    $scope.sales_executives = Api.SalesExecutive.query();
    $scope.price_types = Api.PriceType.query();
    $scope.statuses = Api.CustomerStatus.query();
    $scope.geographys = Api.Geography.query();
    $scope.copyShipping = function(customer){
    	if(customer.shipping_address && customer.shipping_address.same){
    		$scope.customer.billing_address = customer.shipping_address;
    	}
    	else{
    		$scope.customer.billing_address = {};
    	}
    	
    };
    $scope.addContact = function(customer){
    	if(customer.contact.name && customer.contact.position && customer.contact.phone ){
	    	if($scope.customer.contacts){
	    		$scope.customer.contacts.push(customer.contact);
	    	}
	    	else{
	    		$scope.customer.contacts = [customer.contact];
	    	}
	    	customer.contact = {};
    	}
    }
    $scope.removeContact = function(index){
    	$scope.customer.contacts.splice(index, 1);
    }

}).controller('CustomerEditController',function($scope,$state,$stateParams,Customer){

    $scope.updateCustomer=function(){
        $scope.customer.$update(function(){
            $state.go('customers');
        });
    };

    $scope.deleteCustomer=function(customer){
   	   if(popupService.showPopup('Really delete this?')){
   	       customer.$delete(function(){
   	    	$state.go('customers');
   	      });
   	   }
   	};
   	
    $scope.loadCustomer=function(){
        $scope.customer=Customer.get({id:$stateParams.id});
    };

    $scope.loadCustomer();
});
