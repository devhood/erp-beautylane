angular.module('purchaseApp.controllers',['ngTable'])
.controller('PurchaseListController',function($scope,$state,popupService,$window,Purchase,ngTableParams, $filter, DTColumnBuilder,DTOptionsBuilder){



$scope.dtOptions = DTOptionsBuilder
.fromSource('/api/purchases')
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
  DTColumnBuilder.newColumn('supplier').withTitle('Supplier'),
  DTColumnBuilder.newColumn('reference_no').withTitle('Reference Number'),
  DTColumnBuilder.newColumn('purchase_date').withTitle('Purchase Date'),
  DTColumnBuilder.newColumn('expected_arrival_date').withTitle('Expected Arrival Date'),
  DTColumnBuilder.newColumn('purchase_notes').withTitle('Purchase Notes'),
  DTColumnBuilder.newColumn('purchase_status').withTitle('Purchase Status'),
  DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
  .renderWith(function(data, type, full, meta) {
      return '<a href="#/purchases/view", ui-sref="editPurchase" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="View Record">' +
          '   <i class="fa fa-eye"></i>' +
          '</a>&nbsp;' +

          '<a href="#/purchases/edit", ui-sref="editPurchase" class="tooltips btn default" '+
        'data-container="body", data-placement="top", '+
        'data-html="true", data-original-title="Edit Record">' +
          '   <i class="fa fa-edit"></i>' +
          '</a>&nbsp;';
  })
];



}).controller('PurchaseViewController',function($scope,$stateParams,Purchase){
    console.log($stateParams.id);
    $scope.purchase=Purchase.get({id:$stateParams.id});

}).controller('PurchaseCreateController',function($scope,$state,$stateParams,Purchase){

    $scope.purchase=new Purchase();

    $scope.addPurchase=function(){
        $scope.purchase.$save(function(){
            $state.go('purchases');
        });
    }

}).controller('PurchaseEditController',function($scope,$state,$stateParams,Purchase){

    $scope.updatePurchase=function(){
        $scope.purchase.$update(function(){
            $state.go('purchases');
        });
    }
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
