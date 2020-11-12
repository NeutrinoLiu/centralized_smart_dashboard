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

        $scope.notifications = "none yet";


        // todo: check correct var for this
        var initial_zoom = {
            x: -41.26540000000034,
            y: -6.979799999999869,
            width: 5,
            height: 5
        };

        $scope.panzoomConfig = {
            zoomLevels: 40,
            neutralZoomLevel: 20,
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
                    waypoints: [{'lat': 43.076163, 'long': -89.400227}, {'lat': 43.069798, 'long': -89.412654}],
                    curr_coord: {'lat': 90.3456, 'long': -90.6543},
                    notifications: ""
                }
            }

            $http.get(PATH + '/api/waypoint')
                .then ((response) => {
                    response =test_response; // TODO: only for testing, delete when backend ready
                    for (index = 0; index < response.data.waypoints.length; index++) {  
                        $scope.waypoints.push(fullWaypoint(response.data.waypoints[index]));
                    }

                    $scope.curr_coord.lat = response.data.curr_coord.lat;
                    $scope.curr_coord.long = response.data.curr_coord.long;
                    $scope.notifications = response.data.notifications;
                    console.log($scope.waypoints);
                }, (error) => {
                    connectionLost();
                });

            $window.onload = function() {
                for (index = 0; index < $scope.waypoints.length; index++) { 
                    addWaypointToMap($scope.waypoints[index]);

                }
            }
        }

        
        function fullWaypoint(waypoint) {
            waypoint['lat'] = parseFloat(waypoint['lat'])
            waypoint['long'] = parseFloat(waypoint['long'])
            position = coordToXY(waypoint.lat, waypoint.long);
            waypoint['x_pos'] = parseFloat(position['x']);
            waypoint['y_pos'] = parseFloat(position['y']);
            waypoint['index'] = 'point-' + ($scope.waypoints.length + 1);

            return waypoint;
        }

        function coordToXY(latitude, longitude) {
            /*
            Algorithm to change from coord to XY with the pixel scaling factor
            Scaling factor for latitude and longitude was manually calculated from pixel length
            and height of the map.
            TODO: Take the difference from the current Latitude and longitude for the proper coordinates
            // */

            scale_factor = 1;
            x_pos = Math.abs(parseInt(longitude) - longitude);
            y_pos = Math.abs(parseInt(latitude) - latitude);
            if (Math.abs(latitude) < 10) {
                y_pos *= 10;
            } else {
                y_pos *= 100;
            }

            if (Math.abs(longitude) < 10) {
                x_pos *= 10;
            } else if (Math.abs(longitude) < 100) {
                x_pos *= 100;
            } else {
                x_pos *= 1000;
            }

            x_pos = (longitude < 0 ? -1 * x_pos : x_pos) * scale_factor;
            y_pos = (latitude > 0 ? -1 * y_pos : y_pos) * scale_factor;

            return {'x': x_pos, 'y': y_pos};
        }


        function addWaypointToMap(waypoint) {
                $scope.$apply();
                console.log(waypoint);
                top_ = waypoint['y_pos'].toString();
                top_ = top_ + 'px';
                left_ = waypoint['x_pos'].toString();
                left_ = left_ + 'px';
                console.log(document.getElementById(waypoint['index']))
                console.log(document.getElementById('point-1'))
                document.getElementById(waypoint['index']).style.position = 'absolute';
                document.getElementById(waypoint['index']).style.top = top_;
                document.getElementById(waypoint['index']).style.left = left_;
        }

        //Adds waypoint coordinates to the list
        function waypointNew() {
            var latitude = document.getElementById("waypointNewLatitude").value;
            var longitude = document.getElementById("waypointNewLongitude").value;
            var invalidInput = (latitude == "" || longitude == "") || latitude < -180 || latitude > 180 
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
                    $scope.waypoints.push(fullWaypoint(response.data));
                    $scope.notifications += "New Waypoint Added" + '\n';
                    console.log($scope.waypoints);
                    console.log($scope.waypoints.length)
                    addWaypointToMap($scope.waypoints[$scope.waypoints.length - 1]);
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
                    $scope.notifications += "Deleted Waypoint" + '\n';
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
                    $scope.notifications += "ESTOP PRESSED! Rover is force restarting." + '\n';
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