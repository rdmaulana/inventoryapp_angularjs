app.controller('productAddCtrl', ['Product', '$scope', '$state', '$location', '$resource', 'swal', '$localStorage',
	function(Product, $scope, $state, $location, $resource, swal, $localStorage){

		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$scope.product=new Product();
		$scope.product.kode_barang = generateUUID();

		var id_1 = 'Development';
		var id_2 = 'Communication';
		var id_3 = 'Support';
		var id_4 = 'Infrastructure';

		if (id_1 == 'Development') {
			$scope.product.divisi = 1
		}else if (id_2 == 'Communication') {
			$scope.product.divisi = 2
		}else if (id_3 == 'Support') {
			$scope.product.divisi = 3
		}else if (id_4 == 'Infrastructure') {
			$scope.product.divisi = 4
		};
		
		$scope.product.harga_barang = 0;
		$scope.product.harga_sewa = 0;

		$scope.generate = function(){
			 var price = $scope.product.harga_barang;

			 $scope.product.harga_sewa = price * 0.1;
		};

	    $scope.createProduct=function(){
	        $scope.product.$save(function(){
	        	var alert = swal('Submit Success!',
			        'Data was added!',
			        'success');
	        	if (alert) {
	        		$state.go('app.product.list');
	        	};
	        });
	    };

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
	        $scope.product.kode_barang = generateUUID();
	    };

	    $scope.name = /^[a-zA-Z0-9._@ ]{1,50}$/;
	    $scope.value = /^[0-9]{1,50}$/;

		$scope.notBlackListed = function(value) {
	      var blacklist = ['bad@domain.com','verybad@domain.com'];
	      return blacklist.indexOf(value) === -1;
	    }

	    $scope.val = 15;
	    var updateModel = function(val){
	      $scope.$apply(function(){
	        $scope.val = val;
	      });
	    };
	    angular.element("#slider").on('slideStop', function(data){
	      updateModel(data.value);
	    });

	    $scope.select2Number = [
	      {text:'First',  value:'One'},
	      {text:'Second', value:'Two'},
	      {text:'Third',  value:'Three'}
	    ];

	    $scope.list_of_string = ['tag1', 'tag2']
	    $scope.select2Options = {
	        'multiple': true,
	        'simple_tags': true,
	        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
	    };

	    angular.element("#LinkInput").bind('click', function (event) {
	      event.stopPropagation();
	    });

	    // $scope.datePicker = function (start, end, label) {
	      
	    // }

	    // datepicker
            $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
          };

          $scope.dateOptions = {
            formatYear: 'yy',
            showWeeks: false,     
            startingDay: 1,
          };
          $scope.today = new Date();

          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          $scope.format = $scope.formats[0];
}]);