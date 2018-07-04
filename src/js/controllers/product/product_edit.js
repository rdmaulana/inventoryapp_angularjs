app.controller('productEditCtrl', ['Product', '$scope', '$state', '$location', '$http', '$stateParams', 'swal', '$localStorage',
	function(Product, $scope, $state, $location, $http, $stateParams, swal, $localStorage){

		// $scope.loadForm=function(){
	 //        $scope.edit=Product.get({id:$stateParams.id});
	 //    };

	 	if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

	    $scope.edit=Product.get({id:$stateParams.id});

	    // $scope.loadForm();

	    function generateUUID() {
	        var d = new Date().getTime();
	        if (window.performance && typeof window.performance.now === "function") {
	            d += performance.now();
	        }
	        var uuid = 'B0xxx-xxxx'.replace(/[xy]/g, function(c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	        });
	        return uuid;
	    }

	    $scope.refresh = function(){
	        $scope.edit.kode_barang = generateUUID();
	    };

	    $scope.generate = function(){
			 var price = $scope.edit.harga_barang;

			 $scope.edit.harga_sewa = price * 0.1;
		};

		var id_1 = 'Development';
		var id_2 = 'Communication';
		var id_3 = 'Support';
		var id_4 = 'Infrastructure';

		if (id_1 == 'Development') {
			$scope.edit.divisi = 1
		}else if (id_2 == 'Communication') {
			$scope.edit.divisi = 2
		}else if (id_3 == 'Support') {
			$scope.edit.divisi = 3
		}else if (id_4 == 'Infrastructure') {
			$scope.edit.divisi = 4
		};

		var divisiku = $scope.edit.divisi.id;

		$scope.yogs = divisiku;

	    $scope.updatePr = function(){
	    	// $scope.edit.divisi
	    	var params = {
	    					kode_barang: $scope.edit.kode_barang,
	    					nama: $scope.edit.nama,
	    					kategori: $scope.edit.kategori,
	    					stok: $scope.edit.stok,
	    					tgl_masuk: $scope.edit.tgl_masuk,
	    					harga_barang: $scope.edit.harga_barang,
	    					harga_sewa: $scope.edit.harga_sewa,
	    					divisi: $scope.edit.divisi.id
	    				 };
	    	$http.put('http://localhost:1337/barang/'+$stateParams.id, params)
	    		.then(function(data){
	    			console.log('data updated');
	    			var alert = swal('Update Success!',
				        'Data was updated!',
				        'success');
		        	if (alert) {
		        		$state.go('app.product.list');
		        	};
	    		})
	    }

	    $scope.name = /^[a-zA-Z0-9._ ]{1,50}$/;
	    $scope.value = /^[0-9]{1,50}$/;
	    
}]);