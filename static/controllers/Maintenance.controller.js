(function() {
	var app = angular.module('Maintenance', []);
	app.controller('MaintenanceController', ['$scope', '$window', MaintenanceController]);

	function MaintenanceController($scope, $window) {
        //defining scope of functions;;
        $scope.homepage = homepage;
		$scope.resetButton = resetButton;
        $scope.eStopButton = eStopButton;

        //Wheel 1 functionality
        var wheel1slider = document.getElementById("wheel1");
        var wheel1out = document.getElementById("wheel1_val");

        $scope.wheel1 = wheel1out;

        wheel1out.innerHTML = wheel1slider.value;
        wheel1slider.oninput = function () {
            wheel1out.innerHTML = this.value;
            $scope.wheel1 = this.value;
        }

        //Wheel 2 functionality
        var wheel2slider = document.getElementById("wheel2");
        var wheel2out = document.getElementById("wheel2_val");

        $scope.wheel2 = wheel2out;

        wheel2out.innerHTML = wheel2slider.value;
        wheel2slider.oninput = function () {
            wheel2out.innerHTML = this.value;
            $scope.wheel2 = this.value;
        }

        //Wheel 3 functionality
        var wheel3slider = document.getElementById("wheel3");
        var wheel3out = document.getElementById("wheel3_val");

        $scope.wheel3 = wheel3out;

        wheel3out.innerHTML = wheel3slider.value;
        wheel3slider.oninput = function () {
            wheel3out.innerHTML = this.value;
            $scope.wheel3 = this.value;
        }

        //Wheel 4 functionality
        var wheel4slider = document.getElementById("wheel4");
        var wheel4out = document.getElementById("wheel4_val");

        $scope.wheel4 = wheel4out;

        wheel4out.innerHTML = wheel4slider.value;
        wheel4slider.oninput = function () {
            wheel4out.innerHTML = this.value;
            $scope.wheel4 = this.value;
        }

        //Wheel 5 functionality
        var wheel5slider = document.getElementById("wheel5");
        var wheel5out = document.getElementById("wheel5_val");

        $scope.wheel5 = wheel5out;

        wheel5out.innerHTML = wheel5slider.value;
        wheel5slider.oninput = function () {
            wheel5out.innerHTML = this.value;
            $scope.wheel5 = this.value;
        }

        //Wheel 6 functionality
        var wheel6slider = document.getElementById("wheel6");
        var wheel6out = document.getElementById("wheel6_val");

        $scope.wheel6 = wheel6out;

        wheel6out.innerHTML = wheel6slider.value;
        wheel6slider.oninput = function () {
            wheel6out.innerHTML = this.value;
            $scope.wheel6 = this.value;
        }

        //Arm 1 functionality
        var arm1slider = document.getElementById("arm1");
        var arm1out = document.getElementById("arm1_val");

        $scope.arm1 = arm1out;

        arm1out.innerHTML = arm1slider.value;
        arm1slider.oninput = function () {
            arm1out.innerHTML = this.value;
            $scope.arm1 = this.value;
        }

        //Arm 2 functionality
        var arm2slider = document.getElementById("arm2");
        var arm2out = document.getElementById("arm2_val");

        $scope.arm2 = arm2out;

        arm2out.innerHTML = arm2slider.value;
        arm2slider.oninput = function () {
            arm2out.innerHTML = this.value;
            $scope.arm2 = this.value;
        }

        //Arm 3 functionality
        var arm3slider = document.getElementById("arm3");
        var arm3out = document.getElementById("arm3_val");

        $scope.arm3 = arm3out;

        arm3out.innerHTML = arm3slider.value;
        arm3slider.oninput = function () {
            arm3out.innerHTML = this.value;
            $scope.arm3 = this.value;
        }

        //Arm 4 functionality
        var arm4slider = document.getElementById("arm4");
        var arm4out = document.getElementById("arm4_val");

        $scope.arm4 = arm4out;

        arm4out.innerHTML = arm4slider.value;
        arm4slider.oninput = function () {
            arm4out.innerHTML = this.value;
            $scope.arm4 = this.value;
        }

        //Arm 5 functionality
        var arm5slider = document.getElementById("arm5");
        var arm5out = document.getElementById("arm5_val");

        $scope.arm5 = arm5out;

        arm5out.innerHTML = arm5slider.value;
        arm5slider.oninput = function () {
            arm5out.innerHTML = this.value;
            $scope.arm5 = this.value;
        }

        //Arm 6 functionality
        var arm6slider = document.getElementById("arm6");
        var arm6out = document.getElementById("arm6_val");

        $scope.arm6 = arm6out;

        arm6out.innerHTML = arm6slider.value;
        arm6slider.oninput = function () {
            arm6out.innerHTML = this.value;
            $scope.arm6 = this.value;
        }

        //Arm 7 functionality
        var arm7slider = document.getElementById("arm7");
        var arm7out = document.getElementById("arm7_val");

        $scope.arm7 = arm7out;

        arm7out.innerHTML = arm7slider.value;
        arm7slider.oninput = function () {
            arm7out.innerHTML = this.value;
            $scope.arm7 = this.value;
        }

		function homepage() {  // This function takes the user back to the homepage
            $window.location.href = "/home";
        }

        // Sends the reset command to reset all motor direction values to zero
        function resetButton() {
            alert("RESET PRESSED! Setting all motor direction values to zero.");
            wheel1out.innerHTML = 50;
            wheel1slider.value = 50;
            //$scope.wheel1 = 50; //is this needed?

            wheel2out.innerHTML = 50;
            wheel2slider.value = 50;
            //$scope.wheel2 = 50; //is this needed?

            wheel3out.innerHTML = 50;
            wheel3slider.value = 50;
            //$scope.wheel3 = 50; //is this needed?

            wheel4out.innerHTML = 50;
            wheel4slider.value = 50;
            //$scope.wheel4 = 50; //is this needed?

            wheel5out.innerHTML = 50;
            wheel5slider.value = 50;
            //$scope.wheel5 = 50; //is this needed?

            wheel6out.innerHTML = 50;
            wheel6slider.value = 50;
            //$scope.wheel6 = 50; //is this needed?

            arm1out.innerHTML = 50;
            arm1slider.value = 50;
            //$scope.arm1 = 50; //is this needed?

            arm2out.innerHTML = 50;
            arm2slider.value = 50;
            //$scope.arm2 = 50; //is this needed?

            arm3out.innerHTML = 50;
            arm3slider.value = 50;
            //$scope.arm3 = 50; //is this needed?

            arm4out.innerHTML = 50;
            arm4slider.value = 50;
            //$scope.arm4 = 50; //is this needed?

            arm5out.innerHTML = 50;
            arm5slider.value = 50;
            //$scope.arm5 = 50; //is this needed?

            arm6out.innerHTML = 50;
            arm6slider.value = 50;
            //$scope.arm6 = 50; //is this needed?

            arm7out.innerHTML = 50;
            arm7slider.value = 50;
            //$scope.arm7 = 50; //is this needed?

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