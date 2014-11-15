angular.module('adjustmentApp.controllers',[])
.controller('AdjustmentListController',function($scope,$state,popupService,$window,Adjustment, $filter, DTColumnBuilder, DTOptionsBuilder){

var query = {"status_code":{"$in":["ADJUSTMENT_CREATED","ADJUSTMENT_APPROVED"]}};
$scope.dtOptions = DTOptionsBuilder
  .fromSource("/api/adjustments?filter="+encodeURIComponent(JSON.stringify(query)))
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
  DTColumnBuilder.newColumn('adjno').withTitle('Adjustment No.'),
  DTColumnBuilder.newColumn('customer.company_name').withTitle('Customer'),
  DTColumnBuilder.newColumn('transaction_type').withTitle('Adjustment Transaction'),
  DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Location'),
  DTColumnBuilder.newColumn('status').withTitle('Adjustment Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/adjustments/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;' +

          '<a href="#/adjustments/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];



}).controller('AdjustmentViewController',function($scope,$stateParams,Adjustment,User,Api){
    $scope.adjustment=Adjustment.get({id:$stateParams.id});
    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.customers = Api.Customer.query();
    $scope.products = Api.Product.query();

}).controller('AdjustmentCreateController',function($scope,$state,$stateParams,Adjustment, Api){

    $scope.adjustment=new Adjustment();
    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.customers = Api.Customer.query();
    $scope.products = Api.Product.query();
    $scope.addAdjustment=function(){
      console.log("chito");
      $scope.adjustment.status = "ADJ Submitted to Warehouse";
      $scope.adjustment.status_code = "ADJUSTMENT_CREATED";
      $scope.adjustment.$save(function(){
            $state.go('adjustments');
        });
    };
    $scope.addItem = function(adjustment){
        if(adjustment.request.item && adjustment.request.quantity){
          if($scope.adjustment.adjusted_items){
            $scope.adjustment.adjusted_items.push(adjustment.request);
          }
          else{
            $scope.adjustment.adjusted_items = [];
            $scope.adjustment.adjusted_items.push(adjustment.request);
          }
          adjustment.request = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.adjustment.adjusted_items.splice(index, 1);
    };

}).controller('AdjustmentEditController',function($scope,$state,$stateParams,Adjustment, Api){

    $scope.adjustment=Adjustment.get({id:$stateParams.id});
    $scope.updateAdjustment=function(){
      $scope.adjustment.status = "ADJ Approved";
      $scope.adjustment.status_code = "ADJUSTMENT_APPROVED";
        $scope.adjustment.$update(function(){
            $state.go('adjustments');
        });
    };
    $scope.deleteAdjustment=function(adjustments){
      if(popupService.showPopup('Are you sure to detete this?')){
        adjustments.$delete(function(){
          $state.go('adjustments')
        })
      }
    };

    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.customers = Api.Customer.query();
    $scope.products = Api.Product.query();
    $scope.addItem = function(adjustment){
        if(adjustment.request.item && adjustment.request.quantity){
          if($scope.adjustment.adjusted_items){
            $scope.adjustment.adjusted_items.push(adjustment.request);
          }
          else{
            $scope.adjustment.adjusted_items = [];
            $scope.adjustment.adjusted_items.push(adjustment.request);
          }
          adjustment.request = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.adjustment.adjustment_items.splice(index, 1);
    };

});
