(function() {
	var app = angular.module('ERDM', []);
	app.controller('ERDMController', ['$scope', '$window', ERDMController]);

	function ERDMController($scope, $window) {
		$scope.homepage = homepage;
		$scope.waypointNew = waypointNew;
		$scope.cameraIP = cameraIP;
		$scope.eStopButton = eStopButton;
		$scope.waypointDisplay = waypointDisplay;

		function homepage() {
			$window.location.href = "/home";
		}

		//Adds waypoint coordinates to the list
		//when making nodes/routes, use "api" in the front of the name
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

		//Sends a force restart command to the rover
		function eStopButton() {
			alert("ESTOP PRESSED! Rover is force restarting.");
		}
	}
	}

	})();