var app = angular.module('erp',[
    'ui.router',
    'ngResource',
    'message',
    'task',
    'menu',
    'notification',
    'userApp',
    'customerApp',
    'productApp',
    'salesProformaApp',
    'salesOrderApp',
    'salesDeliveryApp',
    'salesInvoiceApp',
    'salesPickListApp',
    'salesPrintApp',
    'salesTripTicketApp',
    'salesMemoApp',
    'salesReturnApp',
    'salesPaymentApp',
    'shipmentApp',
    'purchaseApp',
    'consignmentApp',
    'ui.utils'
]).config(function($locationProvider, $httpProvider) {

   var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
  };

  $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });
}).run(function($rootScope, $http){
    $rootScope.message = '';
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  });
