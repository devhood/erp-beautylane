angular.module('salesInvoiceApp.controllers',[])
.controller('SalesInvoiceListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status_code":{"$in":["SALES_INVOICE_CREATED","DELIVERY_RECEIPT_APPROVED"]}};
$scope.dtOptions = DTOptionsBuilder
  .fromSource("/api/sales?filter="+encodeURIComponent(JSON.stringify(query)))
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
  .withColVis()
  .withColVisOption("buttonText","Columns");
$scope.dtOptions.sScrollX = "100%";
$scope.dtOptions.sScrollXInner = "100%";
$scope.dtOptions.bPaginate = false;
$scope.dtColumns = [
  DTColumnBuilder.newColumn('sino').withTitle('SI Number'),
  DTColumnBuilder.newColumn('drno').withTitle('DR Number'),
  DTColumnBuilder.newColumn('sono').withTitle('SO Number'),
  DTColumnBuilder.newColumn('customer.company_name').withTitle('Customer'),
  DTColumnBuilder.newColumn('customer.sales_executive').withTitle('Sales Executive'),
  DTColumnBuilder.newColumn('shipping_mode').withTitle('Delivery Method'),
  DTColumnBuilder.newColumn('customer.payment_term.payment_term_name').withTitle('Payment Terms'),
  DTColumnBuilder.newColumn('created_on').withTitle('Created On'),
  DTColumnBuilder.newColumn('status').withTitle('Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      var button = '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/invoice/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;';

          if(data.status != "SI Approved"){
            button+='<a href="#/sales/invoice/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
          }
          else{
            button+='</div>';
          }
          return button;
  })
];

}).controller('SalesInvoiceViewController',function($scope,$stateParams,Sales, Api){
  $scope.sales=Sales.get({id:$stateParams.id});
  $scope.payment_terms = Api.PaymentTerm.query();
  $scope.transaction_types = Api.TransactionType.query();
  $scope.price_types = Api.PriceType.query();
  $scope.customers = Api.Customer.query();
  $scope.discounts = Api.Discount.query();
  $scope.sales_executives = Api.SalesExecutive.query();
  $scope.order_sources = Api.OrderSource.query();
  $scope.shipping_modes = Api.ShippingMode.query();
  $scope.inventory_locations = Api.InventoryLocation.query();
  $scope.products = Api.Product.query();

}).controller('SalesInvoiceEditController',function($scope,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});
    $scope.updateSales=function(){
        $scope.sales.status_code = "SI_CREATED";
        $scope.sales.status = "SI Approved";
        $scope.sales.$update(function(){
            $state.go('salesInvoice');
        });
    };
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.transaction_types = Api.TransactionType.query();
    $scope.price_types = Api.PriceType.query();
    $scope.customers = Api.Customer.query();
    $scope.discounts = Api.Discount.query();
    $scope.sales_executives = Api.SalesExecutive.query();
    $scope.order_sources = Api.OrderSource.query();
    $scope.shipping_modes = Api.ShippingMode.query();
    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.products = Api.Product.query();
});
