(function() {

	var app = angular.module('ERDM', ['panzoom', 'panzoomwidget']);
	app.controller('ERDMController', ['$scope', '$window', '$http', 'PanZoomService', ERDMController]);

	function ERDMController($scope, $window, $http) {
		$scope.homepage = homepage;
		$scope.waypointNew = waypointNew;
		$scope.cameraIP = cameraIP;
		$scope.eStopButton = eStopButton;
        $scope.deleteLatestWaypoint = deleteLatestWaypoint;

        $scope.waypoints = [];
        $scope.curr_coord = {'lat': 0, 'long':0};

        // todo: check correct var for this
        var initial_zoom = {
            x: 45,
            y: -85,
            width: 250,
            height: 350
        };

        $scope.panzoomConfig = {
            zoomLevels: 12,
            neutralZoomLevel: 5,
            scalePerZoomLevel: 1.5,
            initialZoomToFit: initial_zoom
        };

        $scope.panzoomModel = {};

        const PATH = 'http://localhost:5000'

        function homepage() {
            $window.location.href = "/home";
        }

        function init() {
            // TODO: sample response, delete when backend ready, points are camprandall and bascom
            test_response = {
                'data': {
                    waypoints: [{'lat': 43.069939, 'long': -89.412116}, {'lat': 43.075441, 'long': -89.404075}],
                    curr_coord: {'lat': 90.3456, 'long': -90.6543}
                }
            }

            $http.get(PATH + '/api/waypoint')
                .then ((response) => {
                    response =test_response; // TODO: only for testing, delete when backend ready
                    response.data.waypoints.forEach(waypoint => $scope.waypoints.push(waypoint));
                    $scope.curr_coord.lat = response.data.curr_coord.lat;
                    $scope.curr_coord.long = response.data.curr_coord.long;
                }, (error) => {
                    connectionLost();
                });

            $window.onload = function() {
                for (index = 0; index < $scope.waypoints.length; index++) { 
                    addWaypointToMap($scope.waypoints[index]);

                }
            }
        }


        function coordToXY(latitude, longitude) {
            /*
            Algorithm to change from coord to XY with the pixel scaling factor
            Scaling factor for latitude and longitude was manually calculated from pixel length
            and height of the map.
            TODO: Take the difference from the current Latitude and longitude for the proper coordinates
            */
            scalingFactorlat = 0.003
            scalingFactorlong = 0.01
            return scalingFactorlat*latitude,scalingFactorlong*long;
        }


        function addWaypointToMap() {
            top_ = waypoint['y_pos'].toString();
            top_ = top_ + 'px';
            left_ = waypoint['x_pos'].toString();
            left_ = left_ + 'px';
            document.getElementById(waypoint['index']).style.position = 'absolute';
            document.getElementById(waypoint['index']).style.top = top_;
            document.getElementById(waypoint['index']).style.left = left_;
        }

        //Adds waypoint coordinates to the list
        function waypointNew() {
            var latitude = document.getElementById("waypointNewLatitude").value;
            var longitude = document.getElementById("waypointNewLongitude").value;

            var invalidInput = !(latitude || longitude) || latitude < -180 || latitude > 180 
                || longitude < -180 || longitude > 180;
            if (invalidInput) {
                alert("Invalid coordinates for new waypoint");
            } else {

                // TODO: sample response, delete when backend ready, points are camprandall and bascom
                test_response = {
                    'data': {
                        'lat': latitude,
                        'long': longitude
                    }
                }
                $http.post( PATH + '/api/waypoint', 
                    {
                        'lat': latitude,
                        'long': longitude
                    }
                )
                .then( (response) => {
                    response = test_response // TODO: remove after back end is ready
                    // translate to XY and then amend
                    $scope.waypoints.push({'lat': response.data.lat, 'long': response.data.long});
                }, (error) => {
                    connectionLost();
                });
            }
        }

        // Removes the last waypoint added to our waypoints 
        function deleteLatestWaypoint() {
            test_response = {
                'data': {
                    'success': true
                }
            }
            $http.get(PATH + '/api/waypoint')
            .then( (response) => {
                response = test_response //TODO: remove after back end is done
                if(response.data.success) {
                    $scope.waypoints.pop();
                }
                else {
                    connectionLost();
                }
            }, (error) => {
                connectionLost();
            });
        }

        //Opens a new window with a live stream of the camera at the IP address sent
        function cameraIP() {  // future iteration item
            alert("A new camera stream IP address has been opened.");
        }

        //Sends a force restart command to the rover
        function eStopButton() {
            alert("ESTOP PRESSED! Rover is force restarting.");
            $http.get(PATH + '/api/emergency-stop')
                .then ((response) => {
                }, (error) => {
                    connectionLost();
                });
        }

        function getCameraIP(){  //future iteration item

        }

        function connectionLost() {
            alert("Connection lost to server");
            // todo: consider if we try some other reconnection or something
        }

        init();
	}

	})();