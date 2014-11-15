angular.module('salesPickListApp.controllers',[])
.controller('SalesPickListController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder){

var query = {"status_code":"PICKLIST_CREATED"};
$scope.dtOptions = DTOptionsBuilder
  .fromSource("/api/packing?filter="+encodeURIComponent(JSON.stringify(query)))
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
   DTColumnBuilder.newColumn('inventory_location').withTitle('Inventory Locations'),
   DTColumnBuilder.newColumn('preparation_date').withTitle('Preparation Date'),
   DTColumnBuilder.newColumn('prepared_by').withTitle('Prepared by'),
   DTColumnBuilder.newColumn('delivery_date').withTitle('Delivery Date'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/sales/picklist/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-folder-open"></i>' +
          '</a>&nbsp;' +

          '<a href="#/sales/picklist/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];
}).controller('SalesPickListCreateController',function($scope,$state,popupService,$window,Sales, $filter,DTOptionsBuilder, DTColumnBuilder, Api){
    $scope.inventory_locations = Api.InventoryLocation.query();

    $scope.packing =new Api.Packing();
    $scope.packing.sales = Api.PickList('BLPI - Showroom').query();
    $scope.addPacking=function(){
      $scope.packing.status = "Picklist Created";
      $scope.packing.status_code = "PICKLIST_CREATED";
      $scope.packing.preparation_date = Date.now();
      $scope.packing.prepared_by = "Chito";
      $scope.packing.$save(function(){
            $state.go('salesPickList');
        });
    };

  $scope.removeItem = function(index){
    $scope.packin.sales.splice(index, 1);
  }



})
