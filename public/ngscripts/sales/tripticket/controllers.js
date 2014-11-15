angular.module('salesTripTicketApp.controllers',[])
.controller('SalesTripTicketListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status":"SO submitted to Warehouse"};
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
  DTColumnBuilder.newColumn('tripno').withTitle('TRP Number'),
  DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Location'),
  DTColumnBuilder.newColumn('prepared_by').withTitle('Prepared By'),
  DTColumnBuilder.newColumn('delivery_date').withTitle('Delivery Date'),
  DTColumnBuilder.newColumn('status').withTitle('Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/tripticket/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;' +

          '<a href="#/sales/tripticket/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];

}).controller('SalesTripTicketViewController',function($scope,$stateParams,Sales, Api){
  $scope.sales=Sales.get({id:$stateParams.id});
  $scope.customers = Api.Customer.query();
  $scope.inventory_locations = Api.InventoryLocation.query();

}).controller('SalesTripTicketCreateController',function($scope,$state,$stateParams,Sales,Api){

    $scope.sales=new Sales();

    $scope.addSales=function(){
        $scope.sales.status = "SO submitted to Warehouse";
        $scope.sales.status_code = "TRIPTICKET_CREATED";
        $scope.sales.$save(function(){
            $state.go('salesTripticket');
        });
    };
  $scope.customers = Api.Customer.query();
  $scope.inventory_locations = Api.InventoryLocation.query();

    $scope.addInfo = function(sales){
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
    $scope.removeInfo = function(index){
      computeTotal($scope);
      $scope.sales.ordered_items.splice(index, 1);
    };


}).controller('SalesTripTicketEditController',function($scope,$window,popupService,$state,$stateParams,Sales, Api){

    $scope.sales=Sales.get({id:$stateParams.id});
    $scope.updateSales=function(){

        $scope.sales.$update(function(){
            $state.go('salesTripticket');
        });
    };
    $scope.deleteSales=function(sales){
        if(popupService.showPopup('Really delete this?')){
            sales.$delete(function(){
            $state.go('salesTripticket');
           });
        }
     };
    $scope.payment_terms = Api.PaymentTerm.query();
    $scope.transaction_types = Api.TransactionType.query();
    $scope.price_types = Api.PriceType.query();
    $scope.customers = Api.Customer.query();
    $scope.inventory_locations = Api.InventoryLocation.query();
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
