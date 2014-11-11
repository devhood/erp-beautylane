angular.module('purchaseApp.controllers',[])
.controller('PurchaseListController',function($scope,$state,popupService,$window,Purchase, $filter, DTColumnBuilder, DTOptionsBuilder){

$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/purchases')
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
$scope.dtOptions.bPaginate = false;
$scope.dtColumns = [
  DTColumnBuilder.newColumn('purno').withTitle('Purchase No.'),
  DTColumnBuilder.newColumn('supplier').withTitle('Supplier'),
  DTColumnBuilder.newColumn('reference_number').withTitle('Reference Number'),
  DTColumnBuilder.newColumn('arrival_date').withTitle('Arrival Date'),
  DTColumnBuilder.newColumn('notes').withTitle('Purchase Notes'),
  DTColumnBuilder.newColumn('status').withTitle('Purchase Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/purchases/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/purchases/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];



}).controller('PurchaseViewController',function($scope,$stateParams,Purchase,Api){
    // console.log($stateParams.id);
    $scope.purchase=Purchase.get({id:$stateParams.id});
    $scope.suppliers = Api.Supplier.query();
    $scope.statuses = Api.PurchaseStatus.query();
    $scope.products = Api.Product.query();
    $scope.conditions = Api.Condition.query();

}).controller('PurchaseCreateController',function($scope,$state,$stateParams,Purchase, Api){

    $scope.purchase=new Purchase();
    $scope.suppliers = Api.Supplier.query();
    $scope.statuses = Api.PurchaseStatus.query();
    $scope.products = Api.Product.query();
    $scope.conditions = Api.Condition.query();
    $scope.addPurchase=function(){
      $scope.purchase.status = "Purchase Created";
      $scope.purchase.created_on = Date.now();
      $scope.purchase.status_code = "PURCHASE_CREATED";
      $scope.purchase.$save(function(){
            $state.go('purchases');
        });
    };
    $scope.addItem = function(purchase){
        console.log(purchase.item);
        if(purchase.item.product && purchase.item.quantity && purchase.item.cost && purchase.item.expiry_date && purchase.item.condition){
          if($scope.purchase.purchase_items){
            $scope.purchase.purchase_items.push(purchase.item);
          }
          else{
            $scope.purchase.purchase_items = [purchase.item];
          }
          purchase.item = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.purchase.purchase_items.splice(index, 1);
    };

}).controller('PurchaseEditController',function($scope,$state,$stateParams,Purchase, Api){

    $scope.purchase=Purchase.get({id:$stateParams.id});
    $scope.updatePurchases=function(){
        console.log($scope.purchase);
        $scope.purchase.$update(function(){
            $state.go('purchases');
        });
    };
    $scope.deletePurchases=function(purchases){
      if(popupService.showPopup('Are you sure to detete this?')){
        purchases.$delete(function(){
          $state.go('purchases')
        })
      }
    };

    $scope.suppliers = Api.Supplier.query();
    $scope.statuses = Api.PurchaseStatus.query();
    $scope.products = Api.Product.query();
    $scope.conditions = Api.Condition.query();
    $scope.addItem = function(purchase){
        console.log(purchase.item);
        if(purchase.item.product && purchase.item.quantity && purchase.item.cost && purchase.item.expiry_date && purchase.item.condition){
          if($scope.purchase.purchase_items){
            $scope.purchase.purchase_items.push(purchase.item);
          }
          else{
            $scope.purchase.purchase_items = [purchase.item];
          }
          purchase.item = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.purchase.purchase_items.splice(index, 1);
    };

}).controller('PurchaseApproveController',function($scope,$state,$stateParams,Purchase){

    $scope.updatePurchase=function(){
        $scope.purchase.$update(function(){
            $state.go('purchases');
        });
    };

    $scope.loadPurchase=function(){
        $scope.purchase=Purchase.get({id:$stateParams.id});
    };

    $scope.loadPurchase();
});
