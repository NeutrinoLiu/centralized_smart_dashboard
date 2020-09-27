(function() {
	var app = angular.module('invalidPage', []);
	app.controller('invalidPageController', ['$scope', '$window', invalidPageController]);

	function invalidPageController($scope, $window) {
		$scope.login = login;

		function login() {
			$window.location.href = "/login";
		}

	}
})();
