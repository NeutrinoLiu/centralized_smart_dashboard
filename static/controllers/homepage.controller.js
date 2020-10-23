(function() {
	var app = angular.module('homepage', []);
	app.controller('homepageController', ['$scope', '$window', homepageController]);

	function homepageController($scope, $window) {
		$scope.aiNav = aiNav;
		$scope.EquipmentServicing = EquipmentServicing;
		$scope.Science = Science;
		$scope.ERDM = ERDM;
		$scope.Maintenance = Maintenance;

		/*
		These are the function that, when the buttons on the homepage are hit, will send to the various pages
		*/
		
		// Sending to AINavigation
		function aiNav() {
			$window.location.href = "/ai-navigation";
		}

		// Sending to EquipmentServicing
		function EquipmentServicing() {
			//$window.location.href = "/equipment-servicing";
			$window.location.href = "/coming-soon";
		}

		// Sending to Science
		function Science() {
			//$window.location.href = "/science";
			$window.location.href = "/coming-soon";
		}

		// Sending to ERDM
		function ERDM() {
			//$window.location.href = "/erdm";
			$window.location.href = "/coming-soon";
		}

		// Sending to Maintenance
		function Maintenance() {
			//$window.location.href = "/maintenance";
			$window.location.href = "/coming-soon";
			
		}

	}
})();

