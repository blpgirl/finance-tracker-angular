// the scope is global variable in angular
var app = angular.module('FinanceTrackerApp',[]);
//app.controller('angularctrl', function ($scope) {
//
//    $scope.fname = "Welcome to";
//    $scope.lname = "Tutlane";
//    $scope.person = {
//                    fname:      'FOO',
//                    lname:        'Example Corp.'
//              }; // scope stock
//
//    $scope.getname = function () {
//      return $scope.fname +" "+ $scope.lname;
//    };
//});

app.factory('stockService', ['$http', function($http){
          var stockApi = {};
          stockApi.searchStocks = function(symbol){
                return $http.get('/search_stock.json?stock=' + symbol);
          }
          return stockApi;
  }]);

app.controller('stocksController', function($scope, stockService) {
  $scope.stock = {};
  //$scope.ticker = "AAPL";
  //console.log("inicialice variables");

    // function to look for stock information
    $scope.lookup = function(){
      //console.log("entre a lookup");
      //console.log($scope.ticker);

      // ticker is my ng-model in the search form
      if($scope.ticker != undefined && $scope.ticker != '') {
          //$scope.stock = {
          //      symbol:      'FOO',
          //      name:        'Example Corp.',
          //      last_price:  '123.00'
          //} // scope stock

          // first function when is success and second when there is an error
          stockService.searchStocks($scope.ticker)
                           .then(function(response){
                             $scope.stock = {
                               error: null,
                               symbol: response.data.ticker,
                               name: response.data.name,
                               last_price: response.data.last_price,
                               can_be_added: response.data.can_be_added
                             }
                           },
                            function(response){
                              $scope.stock = {};
                              $scope.stock.error = response.data.response;
                            });
      } else {
          $scope.stock = {
          };
      }
      //console.log($scope.stock);
    } // scope lookup function
});
