(function() {
	var app = angular.module('AINavigation', []);
	app.controller('AINavigationController', ['$scope', '$window', AINavigationController]);

	function AINavigationController($scope, $window) {
		$scope.homepage = homepage;

		function homepage() {
			$window.location.href = "/home";
		}
	}

	})();