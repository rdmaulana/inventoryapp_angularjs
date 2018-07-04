angular.module('app').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

//directive to set uploaded img file to the scope element
    angular.module('app').directive('fileUpload', ['$parse',
      function ($parse) {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function(scope, element, attrs,ngModel) {
            var model = $parse(attrs.fileUpload);
            var modelSetter = model.assign;

            element.bind('change', function(){

              scope.$apply(function(){
                if (element[0].files.length > 1) {
                  modelSetter(scope, element[0].files);
                }
                else {
                  modelSetter(scope, element[0].files[0]);
                  var file = element[0].files[0];
                  if( file ) {
                    var img = new Image();

                    img.src = window.URL.createObjectURL( file );

                    img.onload = function() {
                      var width = img.naturalWidth,
                      height = img.naturalHeight;

                      window.URL.revokeObjectURL( img.src );


                      if( width <=200 && height <=200 ) {

                        ngModel.$setViewValue(element.val());
                        ngModel.$render();
                      }
                      else {
                        //fail
                      }
                    };
                  }
                  else{
                    ngModel.$setViewValue(element.val());
                        ngModel.$render();
                  }
                }
              });
            });

          }
        };
      }
    ]);

angular.module('app').directive('validFile', function ($parse) {
return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
        var validFormats = ['jpg','jpeg','png'];

        var model = $parse(attrs.ngModel);
        var modelSetter = model.assign;
        var maxSize = 1000000; //1 MB

        elem.bind('change', function () {
            validImage(false);
            scope.$apply(function () {
                ngModel.$render();
                
                scope.image.maxSizeError = false;
                if (el[0].files.length > 1) {
                  modelSetter(scope, elem[0].files);
                } else {
                  modelSetter(scope, elem[0].files[0]);
                }
                var fileSize = elem[0].files[0].size;
                if (fileSize > maxSize) {
                  scope.image.maxSizeError = true;
                }
            });
        });
        ngModel.$render = function () {
            ngModel.$setViewValue(elem.val());
        };
        function validImage(bool) {
            ngModel.$setValidity('extension', bool);
        }
        ngModel.$parsers.push(function(value) {
            var ext = value.substr(value.lastIndexOf('.')+1);
            if(ext=='') return;
            if(validFormats.indexOf(ext) == -1){
                return value;
            }
            validImage(true);
            return value;
        });
    }
  };
});

// angular.module('app').directive('validSize', function($parse) {
//         return {
//             require: 'ngModel',
//             restrict: 'A',
//             link: function(scope, el, attrs, ngModel) {
//                 var model = $parse(attrs.ngModel);
//                 var modelSetter = model.assign;
//                 var maxSize = 1000000; //1 MB
//                 el.bind('change', function() {

//                     scope.$apply(function() {
//                         scope.image.maxSizeError = false;
//                         if (el[0].files.length > 1) {
//                             modelSetter(scope, el[0].files);
//                         } else {
//                             modelSetter(scope, el[0].files[0]);
//                         }
//                         var fileSize = el[0].files[0].size;
//                         if (fileSize > maxSize) {
//                             scope.image.maxSizeError = true;
//                         }
//                     });
//                 });
//             }
//         }
//     });