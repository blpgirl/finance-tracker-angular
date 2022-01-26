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

app.controller('stocksController', function ($scope) {
  $scope.stock = {};
  //$scope.ticker = "AAPL";
  //console.log("inicialice variables");

    // function to look for stock information
    $scope.lookup = function(){
      //console.log("entre a lookup");
      //console.log($scope.ticker);
      
      // ticker is my ng-model in the search form
      if($scope.ticker != undefined && $scope.ticker != '') {
          $scope.stock = {
                symbol:      'FOO',
                name:        'Example Corp.',
                last_price:  '123.00'
          } // scope stock
      } else {
          $scope.stock = {
          };
      }
      //console.log($scope.stock);
    } // scope lookup function
});
