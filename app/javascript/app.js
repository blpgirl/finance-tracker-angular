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

          stockApi.addStockToPortfolio = function(symbol) {
                // call create on user_stocks controller
                return $http.post('/user_stocks.json?ticker=' + symbol);
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
                               message: null,
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

    $scope.add = function(){
          if($scope.stock != undefined && $scope.stock.symbol != ''){
              // then is because is asynchronous call so we have to wait for it
                stockService.addStockToPortfolio($scope.stock.symbol)
                         .then(function(response){
                           $scope.stock.error    = null;
                           $scope.stock.message  = response.data.response;
                           $scope.stock.name     = null;
                           $scope.ticker         = null;
                           // this will call users controller my portfolio as js format
                           $('#stock-list').load('my_portfolio.js');
                         },
                         function(response){
                           $scope.stock = {};
                           $scope.stock.error = response.data.response;
                         });
          } else {
                $scope.stock.error = "Stock cannot be added";
          }
    } // scope add function
}); // stocksController

app.factory('friendService', ['$http', function($http){
         var friendApi = {};
         friendApi.searchFriends = function(search_param){
                 return $http.get('/search_friend.json?search_param=' + search_param);
         }

         friendApi.addFriend = function(id) {
            return return $http.post('/add_friend.json?friend='+id);
        }
        return friendApi;
}]);

app.controller('friendsController', function($scope, friendService) {
  $scope.friends = {};
  $scope.friends.name = 'Foo';

  $scope.lookup = function(){
    // friend_search_param is the ng-model defined in the search form
    if($scope.friend_search_param != undefined && $scope.friend_search_param != ''){
            friendService.searchFriends($scope.friend_search_param)
                .then(function(response){
                      $scope.friends.error    = null;
                      $scope.friends.message  = null;
                      $scope.friends.list     = response.data;
                },
                function(response){
                      $scope.friends       = {};
                      $scope.friends.error = response.data.response;
                });
    } else {
            $scope.friends = {};
    }
  } // scope lookup function

  $scope.add = function(friend_id){
      $scope.friends = {}
      if(friend_id != undefined && friend_id !=''){
          friendService.addFriend(friend_id)
                  .then(function(response){
                      $scope.friend_search_param = null;
                      $scope.friends.error   = null;
                      $scope.friends.message = response.data.response;
                  },
                  function(response){
                      $scope.friends.error = response.data.response;
                  })
      } else {
          $scope.friends.error = "Friend cannot be added";
      }
    } // scope add function
}); // friendsController
