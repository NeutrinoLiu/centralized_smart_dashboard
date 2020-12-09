(function() {
	var app = angular.module('homepage', []);
	app.controller('homepageController', ['$scope', '$window', homepageController]);

	function homepageController($scope, $window) {
		$scope.aiNav = aiNav;
		$scope.Cameras = Cameras;
		$scope.ERDM = ERDM;
		$scope.Maintenance = Maintenance;

		/*
		These are the function that, when the buttons on the homepage are hit, will send to the various pages;;
		*/
		
		// Sending to AINavigation
		function aiNav() {
			$window.location.href = "/ai-navigation";
		}

		// Sending to ERDM
		function ERDM() {
			//$window.location.href = "/erdm";
			$window.location.href = "/erdm";
		}

		// Sending to Maintenance
		function Maintenance() {
			$window.location.href = "/maintenance";
			//$window.location.href = "/coming-soon";
			
		}

		function Cameras() {
			$window.location.href = "/cameras";
			//$window.location.href = "/coming-soon";
        }
	}
})();

