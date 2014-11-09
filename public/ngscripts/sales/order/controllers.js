angular.module('salesOrderApp.controllers',[])
.controller('SalesOrderListController',function($scope, $state, Sales, $filter, DTOptionsBuilder, DTColumnBuilder){

	var query = {"status":"SO submitted to Warehouse"};
	$scope.dtOptions = DTOptionsBuilder
	.fromSource("/api/sales?filter="+encodeURIComponent(JSON.stringify(query)))
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
	DTColumnBuilder.newColumn('sono').withTitle('SO Number'),
	DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Location'),
	DTColumnBuilder.newColumn('order_source').withTitle('Order Source'),
	DTColumnBuilder.newColumn('sales_executive').withTitle('Sales Executive'),
	DTColumnBuilder.newColumn('shipping_mode').withTitle('Delivery Method'),
	DTColumnBuilder.newColumn('ordered_by').withTitle('Ordered By'),
	DTColumnBuilder.newColumn('customer').withTitle('Customer'),
	DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
	  .renderWith(function(data, type, full, meta) {
	      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/order/view/'+data._id+'"", ui-sref="editSalesOrder" class="tooltips btn default" '+
	        'data-container="body", data-placement="top", '+
	        'data-html="true", data-original-title="View Record">' +
	          '   <i class="fa fa-eye"></i>' +
	          '</a>&nbsp;' +
	
	          '<a href="#/sales/order/edit/'+data._id+'"", ui-sref="editSalesOrder" class="tooltips btn default" '+
	        'data-container="body", data-placement="top", '+
	        'data-html="true", data-original-title="Edit Record">' +
	          '   <i class="fa fa-edit"></i>' +
	          '</a>&nbsp;</div>';
		  })
		];

}).controller('SalesOrderViewController',function($scope,$stateParams,Sales){
    console.log($stateParams.id);
    $scope.sales=Sales.get({id:$stateParams.id});

}).controller('SalesOrderCreateController',function($scope,$state,$stateParams,Sales){
    $scope.sales=new Sales();
    $scope.addSales=function(){
        $scope.sales.$save(function(){
            $state.go('salesOrder');
        });
    }
}).controller('SalesOrderEditController',function($scope, popupService, $window,$state,$stateParams,Sales){
    $scope.updateSales=function(){
        $scope.sales.$update(function(){
            $state.go('salesOrder');
        });
    };
    $scope.deleteSales=function(sales){
   	   if(popupService.showPopup('Really delete this?')){
   	       sales.$delete(function(){
   	         $window.location.href='';
   	      });
   	   }
   	};
    $scope.loadSales=function(){
        $scope.sales=Sales.get({id:$stateParams.id});
    };
    $scope.loadSales();
});
