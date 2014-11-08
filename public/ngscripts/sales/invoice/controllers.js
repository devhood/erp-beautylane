angular.module('salesInvoiceApp.controllers',[])
.controller('SalesInvoiceListController',function($scope, $state, popupService, $window, Sales, $filter, DTOptionsBuilder, DTColumnBuilder){


$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/sales')
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
$scope.dtOptions.sScrollX = "100%";
$scope.dtOptions.sScrollXInner = "100%";
$scope.dtColumns = [
  DTColumnBuilder.newColumn('sino').withTitle('SI Number'),
  DTColumnBuilder.newColumn('drno').withTitle('DR Number'),
  DTColumnBuilder.newColumn('sono').withTitle('SO Number'),
  DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Location'),
  DTColumnBuilder.newColumn('order_source').withTitle('Order Source'),
  DTColumnBuilder.newColumn('sales_executive').withTitle('Sales Executive'),
  DTColumnBuilder.newColumn('shipping_mode').withTitle('Delivery Method'),
  DTColumnBuilder.newColumn('ordered_by').withTitle('Ordered By'),
  DTColumnBuilder.newColumn('customer').withTitle('Customer'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<a href="#/sales/invoice/view", ui-sref="editSalesInvoice" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/sales/invoice/edit", ui-sref="editSalesInvoice" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;';
  })
];

}).controller('SalesInvoiceViewController',function($scope,$stateParams,Sales){
    console.log($stateParams.id);
    $scope.sales=Sales.get({id:$stateParams.id});

}).controller('SalesInvoiceCreateController',function($scope,$state,$stateParams,Sales){
    $scope.sales=new Sales();
    $scope.addSales=function(){
        $scope.sales.$save(function(){
            $state.go('sales');
        });
    }
}).controller('SalesInvoiceEditController',function($scope,$state,$stateParams,Sales){
    $scope.updateSales=function(){
        $scope.sales.$update(function(){
            $state.go('sales');
        });
    };
    $scope.loadSales=function(){
        $scope.sales=Sales.get({id:$stateParams.id});
    };
    $scope.loadSales();
});
