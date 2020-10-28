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
			alert("A New waypoint has been added to the list!");
		}

		function waypointDisplay() {
			alert("No waypoints to display");
		}

		//Opens a new window with a live stream of the camera at the IP address sent
		function cameraIP() {
			alert("A new camera stream IP address has been opened.");
		}

		//Sends the first target waypoint in the list to the rover
		function goButton() {
			alert("GO Command Sent! The rover is moving to the top waypoint.");
		}

		//Sends a force restart command to the rover
		function eStopButton() {
			alert("ESTOP PRESSED! Rover is force restarting.");
		}
		
		function getLongitude(){

		}

		function getLatitude(){

		}

		function getCameraIP(){

		}
	}


	})();