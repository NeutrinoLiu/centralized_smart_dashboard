(function() {
	var app = angular.module('homepage', []);
	app.controller('homepageController', ['$scope', '$window', homepageController]);

	function homepageController($scope, $window) {
		$scope.aiNav = aiNav;
		$scope.Cameras = Cameras;
		$scope.ERDM = ERDM;
		$scope.Maintenance = Maintenance;
		
		// Sending to AINavigation
		function aiNav() {
			$window.location.href = "/ai-navigation";
		}

		// Sending to ERDM
		function ERDM() {
			$window.location.href = "/erdm";
		}

		// Sending to Maintenance
		function Maintenance() {
			$window.location.href = "/maintenance";
			
		}

		function Cameras() {
			$window.location.href = "/cameras";
        }
	}
})();

