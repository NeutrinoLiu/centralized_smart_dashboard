(function() {
	var app = angular.module('registerSuccessController', []);
	app.controller('registerSuccessController', ['$scope', '$window', registerSuccessController]);

	function registerSuccessController($scope, $window) {
		function login() {
			$window.location.href ="/login";
		}
	}
})();
