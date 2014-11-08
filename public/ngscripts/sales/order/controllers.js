angular.module('salesApp.controllers',['ngTable'])
.controller('SalesListController',function($scope, $state, popupService, $window, Sales, ngTableParams, $filter, DTOptionsBuilder){


$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/sales/order')
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
  DTColumnBuilder.newColumn('sono').withTitle('SO Number'),
  DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Location'),
  DTColumnBuilder.newColumn('order_source').withTitle('Order Source'),
  DTColumnBuilder.newColumn('sales_executive').withTitle('Sales Executive'),
  DTColumnBuilder.newColumn('delivery_method').withTitle('Delivery Method'),
  DTColumnBuilder.newColumn('odered_by').withTitle('Ordered By'),
  DTColumnBuilder.newColumn('customer').withTitle('Customer'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<a href="#/sales/order/view", ui-sref="editSalesOrder" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/sales/order/edit", ui-sref="editSalesOrder" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;';
  })
];



  $scope.sales=Sales.query();

    $scope.deleteSales = function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
                $window.location.href='';
            });
        }
    };

}).controller('SalesViewController',function($scope,$stateParams,Sales){
    console.log($stateParams.id);
    $scope.sales=Sales.get({id:$stateParams.id});

}).controller('SalesCreateController',function($scope,$state,$stateParams,Sales){
    $scope.sales=new Sales();
    $scope.addSales=function(){
        $scope.sales.$save(function(){
            $state.go('sales');
        });
    }
}).controller('SalesEditController',function($scope,$state,$stateParams,Sales){
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
