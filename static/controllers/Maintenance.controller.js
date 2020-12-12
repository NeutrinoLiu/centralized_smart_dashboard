(function() {
	var app = angular.module('Maintenance', []);
	app.controller('MaintenanceController', ['$scope', '$window',  '$http', MaintenanceController]);

	function MaintenanceController($scope, $window, $http) {
        //defining scope of functions;;
        $scope.homepage = homepage;
		$scope.resetButton = resetButton;
        $scope.eStopButton = eStopButton;
        $scope.wheelChange = wheelChange;
        $scope.armChange = armChange;

        $scope.notifications = "";

        const PATH = 'http://localhost:5000';

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

        function init() {
            $scope.wheel1 = 0;
            $scope.wheel2 = 0;
            $scope.wheel3 = 0;
            $scope.wheel4 = 0;
            $scope.wheel5 = 0;
            $scope.wheel6 = 0;

            $scope.arm1 = 0;
            $scope.arm2 = 0;
            $scope.arm3 = 0;
            $scope.arm4 = 0;
            $scope.arm5 = 0;
            $scope.arm6 = 0;
            $scope.arm7 = 0;

            $http.get(PATH + '/api/notifications')
                .then((response) => {
                    if (response.data.success) {
                        $scope.notifications = response.data.notifications;
                    }
                }, (error) => {
                    connectionLost();
                });

            $http.get(PATH + '/api/maintenance/wheels')
                .then((response) => {
                    if (response.data.success) {
                        wheel1out.innerHTML = response.data.wheels[0];
                        wheel1slider.value = response.data.wheels[0];
                        $scope.wheel1 = response.data.wheels[0];

                        wheel2out.innerHTML = response.data.wheels[1];
                        wheel2slider.value = response.data.wheels[1];
                        $scope.wheel2 = response.data.wheels[1];

                        wheel3out.innerHTML = response.data.wheels[2];
                        wheel3slider.value = response.data.wheels[2];
                        $scope.wheel3 = response.data.wheels[2];

                        wheel4out.innerHTML = response.data.wheels[3];
                        wheel4slider.value = response.data.wheels[3];
                        $scope.wheel4 = response.data.wheels[3];

                        wheel5out.innerHTML = response.data.wheels[4];
                        wheel5slider.value = response.data.wheels[4];
                        $scope.wheel5 = response.data.wheels[4];

                        wheel6out.innerHTML = response.data.wheels[5];
                        wheel6slider.value = response.data.wheels[5];
                        $scope.wheel6 = response.data.wheels[5];
                    }
                }, (error) => {
                    connectionLost();
                });

        $http.get(PATH + '/api/maintenance/arm')
                .then((response) => {
                    if (response.data.success) {
                        arm1out.innerHTML = response.data.arm[0];
                        arm1slider.value = response.data.arm[0];
                        $scope.arm1 = response.data.arm[0];

                        arm2out.innerHTML = response.data.arm[1];
                        arm2slider.value = response.data.arm[1];
                        $scope.arm2 = response.data.arm[1];

                        arm3out.innerHTML = response.data.arm[2];
                        arm3slider.value = response.data.arm[2];
                        $scope.arm3 = response.data.arm[2];

                        arm4out.innerHTML = response.data.arm[3];
                        arm4slider.value = response.data.arm[3];
                        $scope.arm4 = response.data.arm[3];

                        arm5out.innerHTML = response.data.arm[4];
                        arm5slider.value = response.data.arm[4];
                        $scope.arm5 = response.data.arm[4];

                        arm6out.innerHTML = response.data.arm[5];
                        arm6slider.value = response.data.arm[5];
                        $scope.arm6 = response.data.arm[5];

                        arm7out.innerHTML = response.data.arm[6];
                        arm7slider.value = response.data.arm[6];
                        $scope.arm7 = response.data.arm[6];
                    }
                }, (error) => {
                    connectionLost();
                });

        }

		function homepage() {  // This function takes the user back to the homepage
            $window.location.href = "/home";
        }

        function wheelChange() {
            var wheels = [parseInt($scope.wheel1), parseInt($scope.wheel2), parseInt($scope.wheel3), parseInt($scope.wheel4), parseInt($scope.wheel5), parseInt($scope.wheel6)]
            $http.post(PATH + '/api/maintenance/wheels', {
                'wheels': wheels
            }).then((response)  => {
                if (!response.data.success)  {
                    connectionLost();
                }
                else {
                    addNotification("Wheels changed!");
                }
            }, (error) => {
                connectionLost()
            });
        }

        function armChange() {
            var joints = [parseInt($scope.arm1), parseInt($scope.arm2), parseInt($scope.arm3), parseInt($scope.arm4), parseInt($scope.arm5), parseInt($scope.arm6), parseInt($scope.arm7)]
            $http.post(PATH + '/api/maintenance/arm', {
                'arm': joints
            }).then((response)  => {
                if (!response.data.success)  {
                    connectionLost();
                }
                else {
                    addNotification("Arms changed!");
                }
            }, (error) => {
                connectionLost()
            });
        }

        // Sends the reset command to reset all motor direction values to zero
        function resetButton() {
            alert("RESET PRESSED! Setting all motor direction values to zero.");
            wheel1out.innerHTML = 0;
            wheel1slider.value = 0;

            wheel2out.innerHTML = 0;
            wheel2slider.value = 0;

            wheel3out.innerHTML = 0;
            wheel3slider.value = 0;

            wheel4out.innerHTML = 0;
            wheel4slider.value = 0;

            wheel5out.innerHTML = 0;
            wheel5slider.value = 0;

            wheel6out.innerHTML = 0;
            wheel6slider.value = 0;

            arm1out.innerHTML = 0;
            arm1slider.value = 0;

            arm2out.innerHTML = 0;
            arm2slider.value = 0;

            arm3out.innerHTML = 0;
            arm3slider.value = 0;

            arm4out.innerHTML = 0;
            arm4slider.value = 0;

            arm5out.innerHTML = 0;
            arm5slider.value = 0;

            arm6out.innerHTML = 0;
            arm6slider.value = 0;

            arm7out.innerHTML = 0;
            arm7slider.value = 0;

            $scope.wheel1 = 0;
            $scope.wheel2 = 0;
            $scope.wheel3 = 0;
            $scope.wheel4 = 0;
            $scope.wheel5 = 0;
            $scope.wheel6 = 0;

            $scope.arm1 = 0;
            $scope.arm2 = 0;
            $scope.arm3 = 0;
            $scope.arm4 = 0;
            $scope.arm5 = 0;
            $scope.arm6 = 0;
            $scope.arm7 = 0;

            // Calls the backend to update the values in the rover
            wheelChange();
            armChange();
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

        // Adds a new notification to the notifications scope for the notifications bar
        function addNotification(newNotification) {
            $scope.notifications += (newNotification + '\n');
            $http.post(PATH + '/api/notifications', {
                'notifications': $scope.notifications
            }).then((response) => {
                if (response.data.success){
                    $scope.notifications = response.data.notifications;
                } else {
                    connectionLost();
                }
            }, (error) => {
                connectionLost();
            })
        }

        function connectionLost() {
            alert("Connection lost to server");
            // todo: consider if we try some other reconnection or something
        }

        init();
	}

	})();