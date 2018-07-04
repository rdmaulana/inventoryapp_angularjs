app.controller('latihanCtrl', ['$scope',
	function($scope){
		$scope.reverse = function(){
			return $scope.inputan.split("").reverse().join("");
		}

		$scope.polindrom = function(inputan){
			var reverse = inputan.split('').reverse().join('');
			return reverse == inputan;
		};

		$scope.data = [
			{
				koreksi: "kurang tampan nih webnya",
				perbaikan: "sudah diganti"
			},
			{
				koreksi: "yogs gw yang paling ganteng",
				perbaikan: "yoi braaah"
			},
			{
				koreksi: "tabel nya kurang rafih",
				perbaikan: "oke bosku"
			},
			{
				koreksi: "kurang tampan nih webnya",
				perbaikan: "sudah diganti"
			},
			{
				koreksi: "yogs gw yang paling ganteng",
				perbaikan: "yoi braaah"
			},
			{
				koreksi: "tabel nya kurang rafih",
				perbaikan: "oke bosku"
			},
		]
}]);