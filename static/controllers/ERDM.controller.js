(function() {
	var app = angular.module('ERDM', []);
	app.controller('ERDMController', ['$scope', '$window', ERDMController]);

	function ERDMController($scope, $window) {
		$scope.homepage = homepage;
		$scope.waypointNew = waypointNew;
		$scope.cameraIP = cameraIP;
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

		//Sends a force restart command to the rover
		function eStopButton() {
			alert("POKEMON CRASH");
		}
	}
	}

	})();