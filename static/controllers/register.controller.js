(function() {
	var app = angular.module('register', []);
	app.controller('registerController', ['$scope', '$window', '$http', registerController]);

	function registerController($scope, $window, $http) {
		$scope.validateRegister = validateRegister;
		$scope.back2login = back2login;

		function validateRegister() {
			//TODO: add validations
			var username = document.getElementById("reg_name").value;  
			var password = document.getElementById("reg_pwd").value;
			var address = document.getElementById("reg_addr").value;  
			var contact = document.getElementById("reg_contact").value;
			// TODO: add pp
			var completeInfo = username && password &&
				address &&	contact;

			if (completeInfo) {
				//TODO: store user
				$window.location.href ="/register";
			} else {
				invalidInfo();
			}
		}
        function back2login() {
			$window.location.href ="/login";
		}
		function invalidInfo() {
			console.log('show invalid info');
            document.getElementById("reg_error").innerHTML = "invalid or incomplete register information";
		}

	}
})();
