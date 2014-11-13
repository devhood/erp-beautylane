angular.module('salesReturnApp.controllers',[])
.controller('SalesReturnListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status":{"$in":["SI Approved","RMR sent to Warehouse"]}};
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
  .withColVisOption("buttonText","Columns")
  .withTableTools('/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf')
  .withTableToolsButtons([
      'pdf',
      'xls',
  ]);
$scope.dtOptions.sScrollX = "100%";
$scope.dtOptions.sScrollXInner = "100%";
$scope.dtOptions.bPaginate = false;
$scope.dtOptions.bProcessing = false;
$scope.dtOptions.processing =  true;
$scope.dtColumns = [
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
       var button = '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/return/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;';

          if(data.status != "RMR sent to Warehouse"){
            button+='<a href="#/sales/return/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
          }
          else if(data.status != "RMR approved and submitted to Finance"){
           button+='<a href="#/sales/return/approve/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
          }
          else{
            buttom+='</div>';
          }
          return button;

  })
];

}).controller('SalesReturnViewController',function($scope,$stateParams,Sales, Api){
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

}).controller('SalesReturnCreateController',function($scope,$state,$stateParams,Sales,Api){
$scope.sales=Sales.get({id:$stateParams.id});
    $scope.updateSales=function(){
        delete $scope.sales.status_code;
        $scope.sales.status = "RMR approved and submitted to Finance";
        $scope.sales.$update(function(){
            $state.go('salesReturn');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesReturn');
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
   
}).controller('SalesReturnEditController',function($scope,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});
    $scope.updateSales=function(){
        $scope.sales.status_code = "RMR_CREATED";
        $scope.sales.status = "RMR sent to Warehouse";
        $scope.sales.$update(function(){
            $state.go('salesReturn');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesReturn');
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


var computeTotalReturnItems = function($scope){
 
  $scope.sales.return_total_vat = 0;
  $scope.sales.return_discount = 0;
  $scope.sales.return_total = 0;
  $scope.sales.return_total_vat_exempt = 0;
  $scope.sales.return_total_amount_due = 0;
 
  for(var i=0;i<$scope.sales.returned_items.length; i++){
    $scope.sales.return_vat_percent = $scope.sales.is_vat_percent ? .11 : .12;
    $scope.sales.return_total+=$scope.sales.returned_items[i].return_total;
    $scope.sales.return_discount+=$scope.sales.returned_items[i].return_total/$scope.sales.returned_items[i].return_discount - $scope.sales.returned_items[i].return_total;
    $scope.sales.return_total_vat+=parseFloat(( $scope.sales.returned_items[i].return_total * parseFloat($scope.sales.return_vat_percent) ).toFixed(2));
    if($scope.sales.is_vat_percent){
      $scope.sales.return_total_vat_exempt+=parseFloat(( $scope.sales.returned_items[i].return_total * parseFloat(.01) ).toFixed(2));
    }
   
  }
  $scope.sales.return_total_amount_due = parseFloat($scope.sales.return_total) - parseFloat($scope.sales.return_total_vat_exempt);
  console.log($scope.sales.total_amount_due);
  $scope.sales.total_amount_due =  (parseFloat($scope.sales.total) - parseFloat($scope.sales.total_vat_exempt)) - $scope.sales.return_total_amount_due;
};
