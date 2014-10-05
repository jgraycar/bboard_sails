var bboardApp = angular.module('bboardApp', []); // Defines an angular module

bboardApp.controller('BoardController',function($scope,$http,$log){
  //$log is used for console log
  //$http is used to communicate with the server
  //$scope defines the scope of controller
  $scope.boards=[];
  $http.get("http://localhost:3000/board/")
    .success(function(data){
      $scope.boards=data;
      $log.info($scope.empList);
    });
});
