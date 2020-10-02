// JavaScript source code
(function() {
	var app = angular.module('profile', []);
	app.controller('profileController', ['$scope', '$window', profileController]);

    function profileController($scope, $window) {
        $scope.profilepic;
        $scope.userName = 'Sample user';
        //TODO Need someone to help me figure out how this even works
        function readURL(input) {  // couldnt get this to work like I wanted it to
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imagio')
                    .attr('src', e.target.result)
                    .width(325)
                    .height(300);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

	}
})();
