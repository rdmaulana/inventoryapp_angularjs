'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$localStorage', 
  function($scope, $http, $state, $localStorage) {
    // $scope.user = {};
    // $scope.authError = null;
    // $scope.login = function() {
    //   $scope.authError = null;
    //   // Try to login
    //   $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
    //   .then(function(response) {
    //     if ( !response.data.user ) {
    //       $scope.authError = 'Email or Password not right';
    //     }else{
    //       $state.go('app.dashboard');
    //     }
    //   }, function(x) {
    //     $scope.authError = 'Server Error';
    //   });
    // };

    $scope.getUser = {};
    $localStorage.user = undefined;

    //access login
    $scope.login = function (data) {
      $scope.authError = null;
      $http.post('http://localhost:1337/pengguna/signin',{email:data.Email,password:data.Password})
        .success(function(respon){
          if(respon.status=='berhasil'){
            $localStorage.user = respon.data;
            $state.go('app.dashboard');
          } else {
            $scope.authError = 'Email or Password not right';
          }  
        })
        .error(function(err){
            $scope.authError = 'Email or Password not right';
            console.log(err)
        });
    };
}]);