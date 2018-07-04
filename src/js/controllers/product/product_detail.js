app.controller('productDetailCtrl', ['Product', '$scope', '$state', '$location', '$stateParams', 'swal', '$localStorage',
	function(Product, $scope, $state, $location, $stateParams, swal, $localStorage){

        if(!$localStorage.user) {
                $location.path('/access/signin');
                swal(
                    'Oops...',
                    "You're not login!",
                    'error'
                );  
            }
        console.log('user',$localStorage.user);

		$scope.products=Product.get({id:$stateParams.id});
              
        $scope.remove = function(){
            //var result = confirm('Are you sure delete this product ?');
            swal({
                title: 'Are you sure?',
                text: 'You would not be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(() => {
                $scope.products.$delete(function(){
                    $state.go('app.product.list');
                });
                swal(
                    'Deleted!',
                    'Data has been deleted.',
                    'success'
                );
            });

            // if (result) {
            // 	$scope.products.$delete(function(){
	           //      $state.go('app.product.list');
	           //  });
            // }
          };
}]);