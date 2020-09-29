(function() {
	var app = angular.module('register', []);
	app.controller('registerController', ['$scope', '$window', '$http', registerControlle]r);

	function registerController($scope, $window, $http) {
		$scope.validateLogin = validateLogin;
		$scope.register = register;

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
		
		function invalidInfo() {
			console.log('show invalid info');
		}

	}
})();
