(function() {
	var app = angular.module('login', []);
	app.controller('loginController', ['$scope', '$window', '$http', loginController]);

	function loginController($scope, $window, $http) {
		$scope.validateLogin = validateLogin;
		$scope.register = register;

		function validateLogin() {
			//TODO: add validations
			var username = document.getElementById("usr_name").value;  
			var password = document.getElementById("usr_pwd").value;
			if (username && password) {
				//todo: validate users
				if (true) {
					$window.location.href ="/main";
				} else {
					invalidInfo();
				}
			} else {
				invalidInfo();	
			}
		}

		function register() {
			$window.location.href ="/register";
		}

		function invalidInfo() {
			console.log('show invalid info');
			document.getElementById("login_error").innerHTML = "wrong username or password";
		}

	}
})();
