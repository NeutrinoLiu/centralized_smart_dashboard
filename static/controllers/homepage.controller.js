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
			$window.location.href = "/AINavigation";
		}

		// Sending to EquipmentServicing
		function EquipmentServicing() {
			$window.location.href = "/EquipmentServicing";
		}

		// Sending to Science
		function Science() {
			$window.location.href = "/Science";
		}

		// Sending to ERDM
		function ERDM() {
			$window.location.href = "/ERDM";
		}

		// Sending to Maintenance
		function Maintenance() {
			$window.location.href = "/Maintenance";
		}

	}
})();

