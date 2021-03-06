angular.module('salesPaymentApp.controllers',[])
.controller('SalesPaymentListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status_code":{"$in":["PAYMENT_CREATED","PAYMENT_APPROVED"]}};
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
  DTColumnBuilder.newColumn('pmno').withTitle('PM Number'),
  DTColumnBuilder.newColumn('rmrno').withTitle('RMR Number'),
  DTColumnBuilder.newColumn('cmno').withTitle('CM Number'),
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
      var button = '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/payment/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;';

          if(data.status == "SI Approved" || data.status == "Credit Memo approved"){
            button+='<a href="#/sales/payment/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
          }
          else if(data.status == "Payment Received and waiting for approval"){
            button+='<a href="#/sales/payment/approve/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
          }else{
            button+='</div>';
          }
          return button;

  })
];

}).controller('SalesPaymentViewController',function($scope,$stateParams,Sales, Api){
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
  $scope.payment_types = Api.PaymentType.query();

}).controller('SalesPaymentCreateController',function($scope,$filter,$window,popupService,$state,$stateParams,Sales, Api){
  $scope.sales=Sales.get({id:$stateParams.id});

    $scope.updateSales=function(){
        $scope.sales.status_code = "PM_CREATED";
        $scope.sales.status = "Payment Received and waiting for approval";
        $scope.sales.$update(function(){
            $state.go('salesPayment');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesPayment');
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
    $scope.payment_types = Api.PaymentType.query();
    $scope.addDetail = function(sales){


        if($scope.sales.payment_details){
          $scope.sales.payment_details.push(sales.payment);
        }
        else{
          $scope.sales.payment_details = [sales.payment];
        }
        computeTotal($scope);
        sales.payment = {};
      }

    $scope.removeDetail = function(index){
      computeTotal($scope);
      $scope.sales.payment_details.splice(index, 1);
    }
    $scope.computeVat = function(sales){
      if($scope.sales.ordered_items && sales.customer){
        computeTotal($scope);
      }
    };
}).controller('SalesPaymentEditController',function($scope,$filter,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});

    $scope.updateSales2=function(){
        delete $scope.sales.status_code;
        $scope.sales.status = "Transaction COMPLETE";
        $scope.sales.$update(function(){
            $state.go('salesPayment');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesPayment');
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
    $scope.payment_types = Api.PaymentType.query();
    $scope.addDetail = function(sales){


        if($scope.sales.payment_details){
          $scope.sales.payment_details.push(sales.payment);
        }
        else{
          $scope.sales.payment_details = [sales.payment];
        }
        computeTotal($scope);
        sales.payment = {};
      }

    $scope.removeDetail = function(index){
      computeTotal($scope);
      $scope.sales.payment_details.splice(index, 1);
    }
    $scope.computeVat = function(sales){
      if($scope.sales.ordered_items && sales.customer){
        computeTotal($scope);
      }
    };
});
