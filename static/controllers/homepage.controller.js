(function() {
	var app = angular.module('homepage', []);
	app.controller('homepageController', ['$scope', '$window', invalidPageController]);

	function homepageController($scope, $window) {
		
		/*
		These are the function that, when the buttons on the homepage are hit, will send to the various pages
		*/
		
		// Sending to AINavigation
		$scope.aiNav = aiNav;
		function aiNav() {
			$window.location.href = "/AINavigation";
		}

		// Sending to EquipmentServicing
		$scope.EquipmentServicing = EquipmentServicing;
		function EquipmentServicing() {
			$window.location.href = "/EquipmentServicing";
		}

		// Sending to Science
		$scope.Science = Science;
		function Science() {
			$window.location.href = "/Science";
		}

		// Sending to ERDM
		$scope.ERDM = ERDM;
		function ERDM() {
			$window.location.href = "/ERDM";
		}

		// Sending to Maintenance
		$scope.Maintenance = Maintenance;
		function Maintenance() {
			$window.location.href = "/Maintenance";
		}

	}
})();

