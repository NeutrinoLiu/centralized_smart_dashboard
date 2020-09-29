(function() {
	var app = angular.module('login', []);
	app.controller('loginController', ['$scope', '$window', '$http', loginController]);

	function loginController($scope, $window, $http) {
		$scope.validateLogin = validateLogin;
		$scope.register = register;

		function validateLogin() {
			//TODO: add validations
			console.log('validate login called');
			$window.location.href ="/main";
		}

		function register() {
			$window.location.href ="/register";
		}

	}
})();
