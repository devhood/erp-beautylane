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
			// DTColumnBuilder.newColumn('type').withTitle('Type'),
			DTColumnBuilder.newColumn('company_name').withTitle('Company Name'),
			DTColumnBuilder.newColumn('branch.branch_name').withTitle('Branch'),
			DTColumnBuilder.newColumn('credit_limit').withTitle('Credit Limit'),
			DTColumnBuilder.newColumn('transaction_limit').withTitle('Transaction Limit'),
			DTColumnBuilder.newColumn('payment_term.payment_term_name').withTitle('Payment Terms'),
			// DTColumnBuilder.newColumn('shipping_mode').withTitle('Shipping Mode'),
			DTColumnBuilder.newColumn('sales_executive').withTitle('Sales Executive'),
			// DTColumnBuilder.newColumn('price_type.price_type_name').withTitle('Price Type'),
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

}).controller('CustomerViewController',function($scope,$stateParams,Customer,Api){

    $scope.customer=Customer.get({id:$stateParams.id});
    $scope.types = Api.CustomerType.query();
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.shipping_modes = Api.ShippingMode.query();
    $scope.sales_executives = Api.SalesExecutive.query();
    $scope.price_types = Api.PriceType.query();
    $scope.statuses = Api.CustomerStatus.query();
    $scope.geographys = Api.Geography.query();
		$scope.discounts = Api.Discount.query();
    $scope.countries = Api.Country.query();

}).controller('CustomerCreateController',function($scope,$state,$stateParams,Customer,Api,User){

    $scope.customer=new Customer();

    $scope.addCustomer=function(){
			  delete $scope.customer.shipping_address.province.cities;
				delete $scope.customer.shipping_address.city.zipcodes;
				$scope.customer.shipping_address.province.cities = [$scope.customer.shipping_address.city];
				$scope.customer.shipping_address.city.zipcodes = [$scope.customer.shipping_address.zipcode];
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
    $scope.countries = Api.Country.query();
		$scope.discounts = Api.Discount.query();
    $scope.copyShipping = function(customer){
    	if(customer.shipping_address && customer.shipping_address.same){
    		$scope.customer.billing_address = customer.shipping_address;
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

}).controller('CustomerEditController',function($scope,$state,$window,popupService,$stateParams,Customer, Api){

	$scope.customer=Customer.get({id:$stateParams.id});
    $scope.updateCustomer=function(){
			 delete $scope.customer.shipping_address.province.cities;
			 delete $scope.customer.shipping_address.city.zipcodes;
			 $scope.customer.shipping_address.province.cities = [$scope.customer.shipping_address.city];
			 $scope.customer.shipping_address.city.zipcodes = [$scope.customer.shipping_address.zipcode];
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
   	$scope.types = Api.CustomerType.query();
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.shipping_modes = Api.ShippingMode.query();
    $scope.sales_executives = Api.SalesExecutive.query();
    $scope.price_types = Api.PriceType.query();
    $scope.statuses = Api.CustomerStatus.query();
    $scope.geographys = Api.Geography.query();
    $scope.countries = Api.Country.query();
		$scope.discounts = Api.Discount.query();
    $scope.copyShipping = function(customer){
    	if(customer.shipping_address && customer.shipping_address.same){
    		$scope.customer.billing_address = customer.shipping_address;
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

});
