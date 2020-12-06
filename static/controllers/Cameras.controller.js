(function() {
	var app = angular.module('cameras', []);
	app.controller('CamerasController', ['$scope', '$window', '$http', CamerasController]);

	function CamerasController($scope, $window, $http) {
        $scope.homepage = homepage;
        $scope.removeLatestCamera = removeLatestCamera;
        $scope.eStopButton = eStopButton;
        $scope.addIP = addIP;

        $scope.cameraIPs = [];  // list of our camera IPs to store
        $scope.notifications = "";

        const PATH = 'http://localhost:5000';

        function init() {
            $http.get(PATH + '/api/notifications')
                .then((response) => {
                    if (response.data.success) {
                        $scope.notifications = response.data.notifications;
                    }
                }, (error) => {
                    connectionLost();
                });

            $http.get(PATH + '/api/ips')
                .then((response) => {
                    if (response.data.success){
                        for (index = 0; index < response.data.cameraIPs.length; index++) {  
                            $scope.waypoints.push(response.data.cameraIPs[index]);
                        }
                    }
                }, (error) => {
                    connectionLost()
                });
        }

        function homepage() {  // takes user back to homepage
            $window.location.href = "/home";
        }

	    // Removes the last camera IP added to our list
        function removeLatestCamera() {
            if ($scope.cameraIPs.length != 0) {
                $scope.cameraIPs.pop();
                $http.post(PATH + '/api/ips',
                    {
                        'cameraIPs': $scope.cameraIPs
                    } 
                    ).then((response) => {
                        if (response.data.success) {
                            $scope.cameraIPs = []
                            for (index = 0; index < response.data.cameraIPs.length; index++) {  
                                $scope.cameraIPs.push(response.data.cameraIPs[index]);
                            }

                            addNotification("Latest IP address for camera removed");
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

        function addIP() {
            // TODO: test
            // TODO: validate ip
            var newIP = document.getElementById("cameraNewIP").value;
            for (index = 0; index < $scope.cameraIPs.length; index++) {
                if (newIP == $scope.cameraIPs[index]) {
                    return;
                }
            }

            $scope.cameraIPs.push(newIP);
            $http.post(PATH + '/api/ips',
            {
                'cameraIPs': $scope.cameraIPs
            } 
            ).then((response) => {
                if (response.data.success) {
                    $scope.cameraIPs = []
                    for (index = 0; index < response.data.cameraIPs.length; index++) {  
                        $scope.cameraIPs.push(response.data.cameraIPs[index]);
                    }

                    addNotification("New IP address for a camera added");
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

        function connectionLost() {
            alert("Connection lost to server");
            // todo: consider if we try some other reconnection or something
        }

        init()
	}

	})();
