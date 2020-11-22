(function() {
	var app = angular.module('Maintenance', []);
	app.controller('MaintenanceController', ['$scope', '$window', MaintenanceController]);

	function MaintenanceController($scope, $window) {
	    $scope.homepage = homepage;
		$scope.resetButton = resetButton;
        $scope.eStopButton = eStopButton;


		function homepage() {  // This function takes the user back to the homepage
            $window.location.href = "/home";
        }

        // Sends the reset command to reset all motor direction values to zero
        function resetButton() {
            alert("RESET PRESSED! Setting all motor direction values to zero.")
            $http.get(PATH + '/api/reset')
                .then ((response) => {
                    if (response.data.success) {
                        // TODO: add notification through http call 
                        addNotification("RESET PRESSED! Setting all motor direction values to zero.");
                    } else {
                        connectionLost();
                    }
                }, (error) => {
                    connectionLost();
                });
        }


		// Sends a force stop command to the rover
        function eStopButton() {
            alert("ESTOP PRESSED! Rover is force restarting.");
            $http.get(PATH + '/api/emergency-stop')
                .then ((response) => {
                    if (response.data.success) {
                        // TODO: add notification through http call 
                        addNotification("ESTOP PRESSED! Rover is force restarting.");
                    } else {
                        connectionLost();
                    }
                }, (error) => {
                    connectionLost();
                });
        }
	}

	})();