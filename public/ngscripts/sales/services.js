angular.module('salesApp.services',[]).factory('Sales',function($resource){
    return $resource('/api/sales/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

var computeTotal = function($scope){
  $scope.sales.total_vat = 0;
  $scope.sales.discount = 0;
  $scope.sales.total = 0;
  $scope.sales.withholding_tax = 0;
  $scope.sales.total_amount_due = 0;

  for(var i=0;i<$scope.sales.ordered_items.length; i++){
    $scope.sales.vat_percent = $scope.sales.is_vat_percent ? .11 : .12;
    $scope.sales.total+=$scope.sales.ordered_items[i].total;
    $scope.sales.discount+=$scope.sales.ordered_items[i].total/$scope.sales.ordered_items[i].discount - $scope.sales.ordered_items[i].total;
    $scope.sales.total_vat+=parseFloat(( $scope.sales.ordered_items[i].total * parseFloat($scope.sales.vat_percent) ).toFixed(2));
    if($scope.sales.is_vat_percent){
      $scope.sales.withholding_tax+=parseFloat(( $scope.sales.ordered_items[i].total * parseFloat(.01) ).toFixed(2));
    }
  }
  $scope.sales.total_amount_due = parseFloat($scope.sales.total) - parseFloat($scope.sales.withholding_tax);
};

var computeTotalReturnItems = function($scope){

  $scope.sales.return_total_vat = 0;
  $scope.sales.return_discount = 0;
  $scope.sales.return_total = 0;
  $scope.sales.return_total_vat_exempt = 0;
  $scope.sales.return_total_amount_due = 0;

  for(var i=0;i<$scope.sales.returned_items.length; i++){
    $scope.sales.return_vat_percent = $scope.sales.is_vat_percent ? .11 : .12;
    $scope.sales.return_total+=$scope.sales.returned_items[i].return_total;
    $scope.sales.return_discount+=$scope.sales.returned_items[i].return_total/$scope.sales.returned_items[i].return_discount - $scope.sales.returned_items[i].return_total;
    $scope.sales.return_total_vat+=parseFloat(( $scope.sales.returned_items[i].return_total * parseFloat($scope.sales.return_vat_percent) ).toFixed(2));
    if($scope.sales.is_vat_percent){
      $scope.sales.return_total_vat_exempt+=parseFloat(( $scope.sales.returned_items[i].return_total * parseFloat(.01) ).toFixed(2));
    }

  }
  $scope.sales.return_total_amount_due = parseFloat($scope.sales.return_total) - parseFloat($scope.sales.return_total_vat_exempt);
  console.log($scope.sales.total_amount_due);
  $scope.sales.total_amount_due =  (parseFloat($scope.sales.total) - parseFloat($scope.sales.total_vat_exempt)) - $scope.sales.return_total_amount_due;
};
