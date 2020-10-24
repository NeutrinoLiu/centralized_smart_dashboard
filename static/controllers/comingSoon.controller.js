(function () {
	var app = angular.module('coming_soon', []);
	app.controller('comingSoonController', ['$scope', '$window', invalidPageController]);

	function comingSoonController($scope, $window) {
		$scope.homepage = homepage;

		function homepage() {
			$window.location.href = "/home";
		}

	}
})();