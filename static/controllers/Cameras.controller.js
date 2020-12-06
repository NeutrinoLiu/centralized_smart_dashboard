(function() {
	var app = angular.module('cameras', []);
	app.controller('CamerasController', ['$scope', '$window', CamerasController]);

	function CamerasController($scope, $window) {
        $scope.homepage = homepage;
        $scope.removeLatestCamera = removeLatestCamera;
        $scope.eStopButton = eStopButton;
        $scope.showVideo = showVideo;
        $scope.addIP = addIP;

        $scope.cameraIPs = [];  // list of our camera IPs to store
        $scope.notifications = "none yet";

        function homepage() {  // takes user back to homepage
            $window.location.href = "/home";
        }

	    // Removes the last camera IP added to our list
        function removeLatestCamera() {
            if ($scope.cameraIPs.length != 0) {
                $scope.cameraIPs.pop();
                $http.post(PATH + '/api/route',
                    {
                        'CameraIPs': $scope.cameraIPs
                    } 
                    ).then((response) => {
                        if (response.data.success) {
                            $scope.cameraIPs = []
                            for (index = 0; index < response.data.cameraIPs.length; index++) {  
                                $scope.cameraIPs.push(fullWaypoint(response.data.cameraIPs[index]));
                            }

                            addNotification("Removed Camera IP");
                        } else {
                            connectionLost();
                        }
                    }, (error) => {
                        connectionLost();
                    });
            } else {
                alert("No IP added. So we cannot remove anything");
            }
        }

        function addIP() {  // function to have us add a new IP address for the new camera

        }

        // Sends a force stop command to the rover
        function eStopButton() {
            alert("ESTOP PRESSED! Rover is force restarting.");
            $http.get(PATH + '/api/emergency-stop')
                .then((response) => {
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

        function showVideo() {  // function to launch and display the video feed from the specified camera IP

        }

        function addNotification(newNotification) {  // function to add notifications to the notifications box
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
	}

	})();
