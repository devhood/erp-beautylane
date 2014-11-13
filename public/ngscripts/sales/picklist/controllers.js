angular.module('salesPickListApp.controllers',[])
.controller('SalesPickListController',function($scope,$state,popupService,$window,Sales, $filter, Api,DTOptionsBuilder, DTColumnBuilder){
  $scope.sales=Api.PickList.query();
  $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withBootstrap()
    .withBootstrapOptions({
        TableTools: {
            classes: {
                container: 'btn-group',
                buttons: {
                    normal: 'btn default'
                }
            }
        }
    })

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
});
