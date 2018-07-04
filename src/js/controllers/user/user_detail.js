app.controller('userDetailCtrl', ['$scope', '$state', '$stateParams', 'User', '$localStorage', '$location', 'swal',
	function($scope, $state, $stateParams, User, $localStorage, $location, swal){
		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$scope.users=User.get({id:$stateParams.id});

		$scope.dataTableOpt = {
		   //custom datatable options 
		  // or load data through ajax call also
		  "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
		};

		$scope.remove = function(){
            // var result = confirm('Are you sure delete this user ?');
            // if (result) {
            // 	$scope.users.$delete(function(){
	           //      $state.go('app.user.list');
	           //  });
            // }

            swal({
                title: 'Are you sure?',
                text: 'You would not be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(() => {
                $scope.users.$delete(function(){
                    $state.go('app.user.list');
                });
                swal(
                    'Deleted!',
                    'Data has been deleted.',
                    'success'
                );
            });
          };
}]);