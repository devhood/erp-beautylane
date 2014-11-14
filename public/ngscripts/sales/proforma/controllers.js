angular.module('salesProformaApp.controllers',[])
.controller('SalesProformaListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status":"PF submitted to Warehouse"};
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
  DTColumnBuilder.newColumn('pfno').withTitle('PF Number'),
  DTColumnBuilder.newColumn('customer.company_name').withTitle('Customer'),
  DTColumnBuilder.newColumn('customer.sales_executive').withTitle('Sales Executive'),
  DTColumnBuilder.newColumn('shipping_mode').withTitle('Delivery Method'),
  DTColumnBuilder.newColumn('customer.payment_term.payment_term_name').withTitle('Payment Terms'),
  DTColumnBuilder.newColumn('created_on').withTitle('Created On'),
  DTColumnBuilder.newColumn('status').withTitle('Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/proforma/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/sales/proforma/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];

}).controller('SalesProformaViewController',function($scope,$stateParams,Sales,User, Api){
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

}).controller('SalesProformaCreateController',function($scope,$state,$stateParams,Sales,Api){

    console.log("chito");
    $scope.sales=new Sales();

    $scope.addSales=function(){
         console.log('salesProforma');
        $scope.sales.status = "PF submitted to Warehouse";
        $scope.sales.created_on = Date.now();
        $scope.sales.status_code = "PF_CREATED";
        $scope.sales.pfno = "";
        $scope.sales.drno = "";
        $scope.sales.sino = "";
        $scope.sales.rmrno = "";
        $scope.sales.cmno = "";
        $scope.sales.pmno = "";
        try{
        $scope.sales.$save(function(){
            console.log('salesProforma');
            $state.go('salesProforma');
        });
      }catch(e){
        console.log(e);
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

        sales.order.price = sales.customer.price_type.price_type_name=="Professional" ? sales.order.item.professional_price : sales.order.item.retail_price;
        sales.order.discount = 1-parseInt(sales.customer.discount.discount.replace(" %",""))/100;
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




}).controller('SalesProformaEditController',function($scope,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});
    $scope.updateSales=function(){

        $scope.sales.$update(function(){
            $state.go('salesProforma');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesProforma');
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

        sales.order.price = sales.customer.price_type.price_type_name=="Professional" ? sales.order.item.professional_price : sales.order.item.retail_price;
        sales.order.discount = 1-parseInt(sales.customer.discount.discount.replace(" %",""))/100;
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

var computeTotal = function($scope){
  $scope.sales.total_vat = 0;
  $scope.sales.discount = 0;
  $scope.sales.total = 0;
  $scope.sales.total_vat_exempt = 0;
  $scope.sales.total_amount_due = 0;

  for(var i=0;i<$scope.sales.ordered_items.length; i++){
    $scope.sales.vat_percent = $scope.sales.is_vat_percent ? .11 : .12;
    $scope.sales.total+=$scope.sales.ordered_items[i].total;
    $scope.sales.discount+=$scope.sales.ordered_items[i].total/$scope.sales.ordered_items[i].discount - $scope.sales.ordered_items[i].total;
    $scope.sales.total_vat+=parseFloat(( $scope.sales.ordered_items[i].total * parseFloat($scope.sales.vat_percent) ).toFixed(2));
    if($scope.sales.is_vat_percent){
      $scope.sales.total_vat_exempt+=parseFloat(( $scope.sales.ordered_items[i].total * parseFloat(.01) ).toFixed(2));
    }
  }
  $scope.sales.total_amount_due = parseFloat($scope.sales.total) - parseFloat($scope.sales.total_vat_exempt);
}
