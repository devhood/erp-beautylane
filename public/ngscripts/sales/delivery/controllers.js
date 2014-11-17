angular.module('salesDeliveryApp.controllers',[])
.controller('SalesDeliveryListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status_code":{"$in":["SALES_ORDER_CREATED","DELIVERY_RECEIPT_CREATED","PRO_FORMA_INVOICE_CREATED"]}};
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
      var button = '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/delivery/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;';

          if(data.status != "DR submitted to Finance"){
            button+='<a href="#/sales/delivery/approve/'+data._id+'", class="tooltips btn default" '+
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

}).controller('SalesDeliveryViewController',function($scope,$stateParams,Sales, Api){
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

}).controller('SalesDeliveryEditController',function($scope,$filter,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});

   // $scope.sales.delivery_date = $filter('date')($scope.sales.delivery_date, "shortDate");
    $scope.updateSales=function(){
        $scope.sales.status_code = "DR_CREATED";
        $scope.sales.status = "DR submitted to Finance";
        $scope.sales.$update(function(){
            $state.go('salesDelivery');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesDelivery');
           });
        }
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
    $scope.addItem = function(sales){
      if(sales.order.item && sales.order.quantity && sales.customer){

        sales.order.price = sales.customer.price_type=="Professional" ? sales.order.item.professional_price : sales.order.item.retail_price;
        sales.order.discount = 1-parseInt(sales.customer.discount.replace(" %",""))/100;
        sales.order.total = sales.order.price * sales.order.quantity * sales.order.discount;

        if($scope.sales.ordered_items){
          $scope.sales.ordered_items.push(sales.order);
        }
        else{
          $scope.sales.ordered_items = [sales.order];
        }
        computeTotal($scope);
        sales.order = {};
      }
    }
    $scope.removeItem = function(index){
      computeTotal($scope);
      $scope.sales.ordered_items.splice(index, 1);
    }
    $scope.computeVat = function(sales){
      if($scope.sales.ordered_items && sales.customer){
        computeTotal($scope);
      }
    };
});
