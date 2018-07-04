app.controller('productListCtrl', ['Product', '$scope', '$localStorage', '$location', 'toaster', '$rootScope', '$modal', 'popupService', '$state', '$window', '$http', 
	function(Product, $scope, $localStorage, $location, toaster, $rootScope, $modal, popupService, $state, $window, $http){

		// $scope.dataTB = [];
		// $http.get('http://localhost:1337/barang/desc')
		// 	.success(function(data){
		// 		$scope.dataTB = data;
		// 	});

		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$scope.datas=Product.query();

		$scope.dataTableOpt = {
		   //custom datatable options 
		  // or load data through ajax call also
		  "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
		};

		$scope.editDialog = function(product){
			var modalInstance = $modal.open({
		        templateUrl: 'tpl/product/product-add-images.html',
		        controller: $scope.model,
		        resolve: {
			        oldProduct: function () {
			          return product;
			        }
		        }
		    });
		}

		$scope.model = function($scope, $modalInstance, oldProduct, Product){
		 	$scope.product = oldProduct;

		 	$scope.$watch('myFile', function(newFileObj){
		        if(newFileObj)
		       	$scope.product.foto_barang = newFileObj.name; 
		    });	 

		    $scope.updateImage = function(){
		    	var params = {
		    					foto_barang: $scope.product.foto_barang
		    				 };
		    	$http.put('http://localhost:1337/barang/'+$scope.product.id, params)
		    		.then(function(data){
		    			$modalInstance.close();		
		    		});
		    	
		    	$scope.toaster = {
					type: 'success',
					title: 'Success',
					text: 'Update product image success'
				};
				
				$scope.pop = function(){
					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
				}; 
				$scope.pop();
		    }

			// $scope.updateProduct = function(){
		 //       Product.update(oldProduct, function(res){
		 //        // $modalInstance.close(res); 
		 //        alert('Berhasil');
		 //        $scope.toaster = {
			//         type: 'success',
			//         title: 'Success',
			//         text: 'Update product image success'
			//     };
			//     $scope.pop = function(){
			//         toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
			//     }; 

			//     $scope.pop();
		 //      });
		 //    };

		    $scope.cancel = function () {
		      //$modalInstance.dismiss('cancel');
		      $modalInstance.close();
		    };	
		}


}]);