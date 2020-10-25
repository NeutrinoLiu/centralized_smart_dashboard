(function() {
	var app = angular.module('AINavigation', []);
	app.controller('AINavigationController', ['$scope', '$window', AINavigationController]);

	function AINavigationController($scope, $window) {
		$scope.homepage = homepage;
		$scope.waypointNew = waypointNew;
		$scope.cameraIP = cameraIP;
		$scope.goButton = goButton;
		$scope.eStopButton = eStopButton;

		function homepage() {
			$window.location.href = "/home";
		}

		//Adds waypoint coordinates to the list
		function waypointNew() {
			alert("The form was submitted");
		}

		function waypointDisplay() {
			alert("No waypoints to display");
		}

		//Opens a new window with a live stream of the camera at the IP address sent
		function cameraIP() {
			alert("The second form was submitted");
		}

		//Sends the first target waypoint in the list to the rover
		function goButton() {
			alert("POKEMON GO");
		}

		//Sends a force restart command to the rover
		function eStopButton() {
			alert("POKEMON CRASH");
		}
	}

	})();