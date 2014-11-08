angular.module('productApp.controllers',['ngTable'])
.controller('ProductListController',function($scope,$state,popupService,$window,Product,ngTableParams, $filter,DTOptionsBuilder, DTColumnBuilder){


$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/products')
// Add Bootstrap compatibility
// .withBootstrap()
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
  DTColumnBuilder.newColumn('part_number').withTitle('Part Number'),
  DTColumnBuilder.newColumn('supplier_code').withTitle('Supplier Code'),
  DTColumnBuilder.newColumn('bl_code').withTitle('BL Code'),
  DTColumnBuilder.newColumn('brand').withTitle('Brand'),
  DTColumnBuilder.newColumn('item_name').withTitle('Item Name'),
  DTColumnBuilder.newColumn('size').withTitle('Size'),
  DTColumnBuilder.newColumn('color').withTitle('Color'),
  DTColumnBuilder.newColumn('payment_term').withTitle('Payment Terms'),
  DTColumnBuilder.newColumn('uom').withTitle('UOM'),
  DTColumnBuilder.newColumn('movement').withTitle('Movement'),
  DTColumnBuilder.newColumn('description').withTitle('Description'),
  DTColumnBuilder.newColumn('supplier').withTitle('Supplier'),
  DTColumnBuilder.newColumn('currency').withTitle('Currency'),
  DTColumnBuilder.newColumn('international_cost').withTitle('Intl Cost'),
  DTColumnBuilder.newColumn('professional_price').withTitle('Prof Price'),
  DTColumnBuilder.newColumn('retail_price').withTitle('Retail Price'),
  DTColumnBuilder.newColumn('status').withTitle('Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<a href="#/products/view", ui-sref="editProduct" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/products/edit", ui-sref="editProduct" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;';
  })
];

}).controller('ProductViewController',function($scope,$stateParams,Product){
    console.log($stateParams.id);
    $scope.product=Product.get({id:$stateParams.id});

}).controller('ProductCreateController',function($scope,$state,$stateParams,Product){

    $scope.product=new Product();

    $scope.addProduct=function(){
        $scope.product.$save(function(){
            $state.go('products');
        });
    }

}).controller('ProductEditController',function($scope,$state,$stateParams,Product){

    $scope.updateProduct=function(){
        $scope.product.$update(function(){
            $state.go('products');
        });
    };

    $scope.loadProduct=function(){
        $scope.product=Product.get({id:$stateParams.id});
    };

    $scope.loadProduct();
});
