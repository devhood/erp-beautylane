angular.module('salesMemoApp.controllers',[])
.controller('SalesMemoListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status_code":{"$in":["CREDIT_MEMO_CREATED","RMR_APPROVED"]}};
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
$scope.dtOptions.bProcessing = false;
$scope.dtOptions.processing =  true;
$scope.dtColumns = [
  DTColumnBuilder.newColumn('cmno').withTitle('CM Number'),
  DTColumnBuilder.newColumn('rmrno').withTitle('RMR Number'),
  DTColumnBuilder.newColumn('sino').withTitle('SI Number'),
  DTColumnBuilder.newColumn('drno').withTitle('DR Number'),
  DTColumnBuilder.newColumn('sono').withTitle('SO Number'),
  DTColumnBuilder.newColumn('customer.company_name').withTitle('Customer'),
  DTColumnBuilder.newColumn('customer.sales_executive').withTitle('Sales Executive'),
  DTColumnBuilder.newColumn('delivery_date').withTitle('Delivery Date'),
  DTColumnBuilder.newColumn('shipping_mode').withTitle('Delivery Method'),
  DTColumnBuilder.newColumn('customer.payment_term.payment_term_name').withTitle('Payment Terms'),
  DTColumnBuilder.newColumn('created_on').withTitle('Created On'),
  DTColumnBuilder.newColumn('status').withTitle('Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
       var button = '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/memo/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;';

          if(data.status != "Credit Memo approved"){
            button+='<a href="#/sales/memo/edit/'+data._id+'", class="tooltips btn default" '+
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

}).controller('SalesMemoViewController',function($scope,$stateParams,Sales, Api){
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
  $scope.conditions = Api.Condition.query();

}).controller('SalesMemoCreateController',function($scope,$state,$stateParams,Sales,Api){

}).controller('SalesMemoEditController',function($scope,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});
    $scope.updateSales=function(){
        $scope.sales.status_code = "CM_CREATED";
        $scope.sales.status = "Credit Memo approved";
        $scope.sales.$update(function(){
            $state.go('salesMemo');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesMemo');
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
    $scope.conditions = Api.Condition.query();

    $scope.addItem = function(sales){

      if(sales.returned.item && sales.returned.quantity && sales.returned.condition.condition && sales.customer){

        sales.returned.price = sales.customer.price_type=="Professional" ? sales.returned.item.professional_price : sales.returned.item.retail_price;
        sales.returned.return_discount = 1-parseInt(sales.customer.discount.discount.replace(" %",""))/100;
        sales.returned.return_total = sales.returned.price * sales.returned.quantity * sales.returned.return_discount;

        if($scope.sales.returned_items){
          $scope.sales.returned_items.push(sales.returned);
        }
        else{
          $scope.sales.returned_items = [sales.returned];
        }

        computeTotalReturnItems($scope);
        sales.returned = {};
      }
    }
    $scope.removeItem = function(index){
      computeTotalReturnItems($scope);
      $scope.sales.returned_items.splice(index, 1);
    }

});
