(function() {
	var app = angular.module('Cameras', []);
	app.controller('CamerasController', ['$scope', '$window', EquipmentServicingController]);

	function CamerasController($scope, $window) {
        $scope.homepage = homepage;
        $scope.removeLatestCamera = removeLatestCamera;

        $scope.cameraIPs = [];  // list of our camera IPs to store

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
	}

	})();
