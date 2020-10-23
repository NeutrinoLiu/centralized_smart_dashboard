(function() {
	var app = angular.module('invalidPage', []);
	app.controller('invalidPageController', ['$scope', '$window', invalidPageController]);

	function invalidPageController($scope, $window) {
		$scope.homepage = homepage;

		function homepage() {
			$window.location.href = "/home";
		}

	}
})();
