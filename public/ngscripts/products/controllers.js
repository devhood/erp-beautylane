angular.module('productApp.controllers',['ngTable'])
.controller('ProductListController',function($scope,$state,popupService,$window,Product, $filter,DTOptionsBuilder, DTColumnBuilder){


$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/products')
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
  DTColumnBuilder.newColumn('part_number').withTitle('Part Number'),
  DTColumnBuilder.newColumn('brand').withTitle('Brand'),
  DTColumnBuilder.newColumn('name').withTitle('Item Name'),
  DTColumnBuilder.newColumn('payment_term').withTitle('Payment Terms'),
  DTColumnBuilder.newColumn('uom').withTitle('UOM'),
  DTColumnBuilder.newColumn('movement').withTitle('Movement'),
  DTColumnBuilder.newColumn('description').withTitle('Description'),
  DTColumnBuilder.newColumn('supplier').withTitle('Supplier'),
  DTColumnBuilder.newColumn('status').withTitle('Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/products/view/'+data._id+'", ui-sref="editProduct" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/products/edit/'+data._id+'", ui-sref="editProduct" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];

}).controller('ProductViewController',function($scope,$stateParams,Product, Api){
    $scope.product=Product.get({id:$stateParams.id});
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.brands = Api.Brand.query();
    $scope.statuses = Api.ProductStatus.query();
    $scope.uoms = Api.Uom.query();
    $scope.movements = Api.Movement.query();
    $scope.suppliers = Api.Supplier.query();
    $scope.currencies = Api.Currency.query();

}).controller('ProductCreateController',function($scope,$state,$stateParams,Product,Api){

    $scope.product=new Product();

    $scope.addProduct=function(){
        $scope.product.$save(function(){
            $state.go('products');
        });
    }
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.brands = Api.Brand.query();
    $scope.statuses = Api.ProductStatus.query();
    $scope.uoms = Api.Uom.query();
    $scope.movements = Api.Movement.query();
    $scope.suppliers = Api.Supplier.query();
    $scope.currencies = Api.Currency.query();
    

}).controller('ProductEditController',function($scope,$window,popupService,$state,$stateParams,Product, Api){

    $scope.updateProduct=function(){
        $scope.product.$update(function(){
            $state.go('products');
        });
    };
    $scope.deleteProduct=function(product){
   	   if(popupService.showPopup('Really delete this?')){
   	       product.$delete(function(){
   	    	 $state.go('products');
   	      });
   	   }
   	};
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.brands = Api.Brand.query();
    $scope.statuses = Api.ProductStatus.query();
    $scope.uoms = Api.Uom.query();
    $scope.movements = Api.Movement.query();
    $scope.suppliers = Api.Supplier.query();
    $scope.currencies = Api.Currency.query();
    $scope.product=Product.get({id:$stateParams.id});
});
