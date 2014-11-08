angular.module('shipmentApp.controllers',['ngTable'])
.controller('ShipmentListController',function($scope,$state,popupService,$window,Shipment,ngTableParams, $filter, DTColumnBuilder, DTOptionsBuilder){

$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/shipments')
// Add Bootstrap compatibility
//.withBootstrap()
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
$scope.dtColumns = [
  DTColumnBuilder.newColumn('part_number').withTitle('Part Number'),
  DTColumnBuilder.newColumn('part_number').withTitle('Supplier'),
  DTColumnBuilder.newColumn('part_number').withTitle('Reference Number'),
  DTColumnBuilder.newColumn('part_number').withTitle('Arrival Date'),
  DTColumnBuilder.newColumn('part_number').withTitle('Confirmed By'),
  DTColumnBuilder.newColumn('part_number').withTitle('Approved By'),
  DTColumnBuilder.newColumn('part_number').withTitle('Shipment Notes'),
  DTColumnBuilder.newColumn('part_number').withTitle('Shipment Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<a href="#/shipments/view", ui-sref="editShipments" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/shipments/edit", ui-sref="editShipments" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;';
  })
];



}).controller('ShipmentViewController',function($scope,$stateParams,Shipment){
    console.log($stateParams.id);
    $scope.shipment=Shipment.get({id:$stateParams.id});

}).controller('ShipmentCreateController',function($scope,$state,$stateParams,Shipment){

    $scope.shipment=new Shipment();

    $scope.addShipment=function(){
        $scope.shipment.$save(function(){
            $state.go('shipments');
        });
    }

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
