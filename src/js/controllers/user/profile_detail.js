app.controller('profileCtrl', ['User', 'swal', 'md5', '$scope', '$state', '$http', '$stateParams', '$location', '$localStorage', '$location',
	function(User, swal, md5, $scope, $state, $http, $stateParams, $location, $localStorage, $location){

		if(!$localStorage.user) { 
				$location.path('/access/signin'); 
				swal( 
					'Oops...',
			        "You're not login!",
			        'error'
				);
			}

		$scope.user_data = $localStorage.user; 

		$scope.users = User.get({id: $stateParams.id});

		$scope.updatePass = function(){
			$scope.new_pass = md5.createHash($scope.new_password);

			if (md5.createHash($scope.password) == $scope.user_data.password) {
				$http.put('http://localhost:1337/pengguna/'+ $scope.user_data.id, 
				{password: $scope.new_pass})
					.success(function(data){
						$state.reload();
		            	swal( 
					        'Update Success!',
					        'Password has been changed!',
					        'success'
					    );
						console.log('SUKSES');
					})
			} else {
				swal(
					'Oops...',
				    "Failed change password!",
				    'error'
				);
			}
		};

		/*
		$scope.updateProfile=function(){
			$scope.users.nama_depan = $scope.user_data.nama_depan;

			//deklare fake ng model
			$scope.new_password = $scope.user_data.password;

			$scope.users.password = md5.createHash($scope.new_password);

        	$scope.users.$update(function(){
            	$state.reload();
            	swal( 
			        'Update Success!',
			        'Password has ben changed!',
			        'success'
			    );
	        });
	    };
		*/
		console.log('user',$localStorage.user);
	}]);