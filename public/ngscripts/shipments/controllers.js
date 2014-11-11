angular.module('shipmentApp.controllers',[])
.controller('ShipmentListController',function($scope,$state,popupService,$window,Shipment, $filter, DTColumnBuilder, DTOptionsBuilder){

$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/shipments')
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
  DTColumnBuilder.newColumn('shipno').withTitle('Shipment No.'),
  DTColumnBuilder.newColumn('supplier').withTitle('Supplier'),
  DTColumnBuilder.newColumn('reference_number').withTitle('Reference Number'),
  DTColumnBuilder.newColumn('arrival_date').withTitle('Arrival Date'),
  DTColumnBuilder.newColumn('notes').withTitle('Shipment Notes'),
  DTColumnBuilder.newColumn('status').withTitle('Shipment Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<div class="btn-group btn-group-xs btn-group-solid"><a href="#/shipments/view/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/shipments/edit/'+data._id+'", class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;</div>';
  })
];



}).controller('ShipmentViewController',function($scope,$stateParams,Shipment){
    // console.log($stateParams.id);
    $scope.shipment=Shipment.get({id:$stateParams.id});
    $scope.supplier = Api.supplier.query();
    $scope.reference_no = Api.reference_no.query();
    $scope.payment_terms = Api.arrival_date.query();
    $scope.payment_terms = Api.confirmed_by.query();
    $scope.payment_terms = Api.approved_by.query();
    $scope.payment_terms = Api.shipment_notes.query();
    $scope.payment_terms = Api.shipment_status.query();

}).controller('ShipmentCreateController',function($scope,$state,$stateParams,Shipment, Api){

    $scope.shipment=new Shipment();
    $scope.suppliers = Api.Supplier.query();
    $scope.statuses = Api.ShipmentStatus.query();
    $scope.products = Api.Product.query();
    $scope.conditions = Api.Condition.query();
    $scope.addShipment=function(){
      $scope.shipment.status = "Shipment Created";
      $scope.shipment.created_on = Date.now();
      $scope.shipment.status_code = "SHIPMENT_CREATED";
      $scope.shipment.$save(function(){
            $state.go('shipments');
        });
    };
    $scope.addItem = function(shipment){
        console.log(shipment.item);
        if(shipment.item.product && shipment.item.quantity && shipment.item.cost && shipment.item.expiry_date && shipment.item.condition){
          if($scope.shipment.shipment_items){
            $scope.shipment.shipment_items.push(shipment.item);
          }
          else{
            $scope.shipment.shipment_items = [shipment.item];
          }
          shipment.item = {};
        }
    };
    $scope.removeItem = function(index){
      $scope.shipment.shipment_items.splice(index, 1);
    };

}).controller('ShipmentEditController',function($scope,$state,$stateParams,Shipment){

    $scope.updateShipment=function(){
        $scope.shipment.$update(function(){
            $state.go('shipments');
        });
    }

}).controller('ShipmentApproveController',function($scope,$state,$stateParams,Shipment){

    $scope.updateShipment=function(){
        $scope.shipment.$update(function(){
            $state.go('shipments');
        });
    };

    $scope.loadShipment=function(){
        $scope.shipment=Shipment.get({id:$stateParams.id});
    };

    $scope.loadShipment();
});
