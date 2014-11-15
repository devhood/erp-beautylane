angular.module('consignmentApp.controllers',[])
.controller('ConsignmentListController',function($scope,$state,popupService,$window,Consignment, $filter, DTColumnBuilder, DTOptionsBuilder){

var query = {"status_code":{"$in":["CONSIGNMENT_CREATED","CONSIGNMENT_APPROVED"]}};
$scope.dtOptions = DTOptionsBuilder
  .fromSource("/api/consignments?filter="+encodeURIComponent(JSON.stringify(query)))
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
  DTColumnBuilder.newColumn('cono').withTitle('Consignment No.'),
  DTColumnBuilder.newColumn('customer.company_name').withTitle('Customer'),
  DTColumnBuilder.newColumn('transaction_type').withTitle('Consignment Transaction'),
  DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Location'),
  DTColumnBuilder.newColumn('status').withTitle('Consignment Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/consignments/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/consignments/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];



}).controller('ConsignmentViewController',function($scope,$stateParams,Consignment,User,Api){
    $scope.consignment=Consignment.get({id:$stateParams.id});
    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.customers = Api.Customer.query();
    $scope.products = Api.Product.query();

}).controller('ConsignmentCreateController',function($scope,$state,$stateParams,Consignment, Api){

    $scope.consignment=new Consignment();
    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.customers = Api.Customer.query();
    $scope.products = Api.Product.query();
    $scope.addConsignment=function(){
      $scope.consignment.status = "CO Submitted to Warehouse";
      $scope.consignment.status_code = "CONSIGNMENT_CREATED";
      $scope.consignment.$save(function(){
            $state.go('consignments');
        });
    };
    $scope.addItem = function(consignment){
        if(consignment.request.item && consignment.request.quantity){
          if($scope.consignment.consigned_items){
            $scope.consignment.consigned_items.push(consignment.request);
          }
          else{
            $scope.consignment.consigned_items = [consignment.request];
          }
          consignment.request = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.consignment.consigned_items.splice(index, 1);
    };

}).controller('ConsignmentEditController',function($scope,$state,$stateParams,Consignment, Api){

    $scope.consignment=Consignment.get({id:$stateParams.id});
    $scope.updateConsignment=function(){
      $scope.consignment.status = "CO Approved";
      $scope.consignment.status_code = "CONSIGNMENT_APPROVED";
        $scope.consignment.$update(function(){
            $state.go('consignments');
        });
    };
    $scope.deleteConsignment=function(consignments){
      if(popupService.showPopup('Are you sure to detete this?')){
        consignments.$delete(function(){
          $state.go('consignments')
        })
      }
    };

    $scope.inventory_locations = Api.InventoryLocation.query();
    $scope.customers = Api.Customer.query();
    $scope.products = Api.Product.query();
    $scope.addItem = function(consignment){
        console.log(consignment.item);
        if(consignment.item.product && consignment.item.quantity){
          if($scope.consignment.consignment_items){
            $scope.consignment.consignment_items.push(consignment.item);
          }
          else{
            $scope.consignment.consignment_items = [consignment.item];
          }
          consignment.item = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.consignment.consignment_items.splice(index, 1);
    };

});
