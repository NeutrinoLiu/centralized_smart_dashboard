(function() {

	var app = angular.module('ERDM', ['panzoom', 'panzoomwidget']);
	app.controller('ERDMController', ['$scope', '$window', '$http', 'PanZoomService', ERDMController]);

	function ERDMController($scope, $window, $http, PanZoomService) {
		$scope.homepage = homepage;
		$scope.waypointNew = waypointNew;
		$scope.cameraIP = cameraIP;
		$scope.eStopButton = eStopButton;
        $scope.deleteLatestWaypoint = deleteLatestWaypoint;

        $scope.waypoints = [];
        $scope.curr_coord = {'lat': 0, 'long':0};

        $scope.notifications = "none yet";

        // todo: add a zoomtofit after each addition
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

        const PATH = 'http://localhost:5000';
        const GPS_INTERVAL = 500; // in milliseconds

        function homepage() {
            $window.location.href = "/home";
        }

        function init() {
            $http.get(PATH + '/api/route')
                .then((response) => {
                    if (response.data.success) {
                        for (index = 0; index < response.data.waypoints.length; index++) {  
                            $scope.waypoints.push(fullWaypoint(response.data.waypoints[index]));
                        }
                    }
                }, (error) => {
                    connectionLost()
                });

            $http.get(PATH + '/api/gps')
                .then((response) => {
                    if (response.data.success) {
                        setInterval(updateRoverCoordinates, GPS_INTERVAL);
                        $scope.curr_coord.lat = response.data.lat;
                        $scope.curr_coord.long = response.data.long;
                    }
                }, (error) => {
                    connectionLost();
                });

            $http.get(PATH + '/api/notifications')
                .then((response) => {
                    if (response.data.success) {
                        $scope.notifications = response.data.notifications;
                    }
                }, (error) => {
                    connectionLost();
                });

            $window.onload = function() {
                addWaypointToMap();
            }
        }

        function updateRoverCoordinates() {
            $http.get(PATH + '/api/gps')
                .then((response) => {
                    if (response.data.success) {
                        $scope.curr_coord.lat = response.data.lat;
                        $scope.curr_coord.long = response.data.long;
                    }
                }, (error) => {
                    connectionLost();
                });
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
            */

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


        function addWaypointToMap() {
            for (index = 0; index < $scope.waypoints.length; index++) { 
                    waypoint = $scope.waypoints[index];
                    top_ = waypoint['y_pos'].toString();
                    top_ = top_ + 'px';
                    left_ = waypoint['x_pos'].toString();
                    left_ = left_ + 'px';
                    document.getElementById(waypoint['index']).style.position = 'absolute';
                    document.getElementById(waypoint['index']).style.top = top_;
                    document.getElementById(waypoint['index']).style.left = left_;
            }

            if ($scope.waypoints.length > 0) {
                var point_location = {
                    x: $scope.waypoints[0]['x_pos'],
                    y: $scope.waypoints[0]['y_pos'],
                    width: 5,
                    height: 5
                };

                PanZoomService.getAPI('PanZoom').then(function (api) {
                    api.zoomToFit(point_location);
                });
            }
        }

        //Adds waypoint coordinates to the list
        function waypointNew() {
            var latitude = document.getElementById("waypointNewLatitude").value;
            var longitude = document.getElementById("waypointNewLongitude").value;
            var invalidInput = (latitude == "" || longitude == "") || latitude < -90 || latitude > 90 
                || longitude < -180 || longitude > 180;

            if (invalidInput) {
                alert("Invalid coordinates for new waypoint");
            } else {

                $scope.waypoints.push(fullWaypoint({'lat': latitude, 'long': longitude}));
                $http.post(PATH + '/api/route',
                    {
                        'waypoints': $scope.waypoints
                    } 
                    ).then((response) => {
                        if (response.data.success) {

                            $scope.waypoints = response.data.waypoints;
                            addNotification("New Waypoint Added");
                            addWaypointToMap();
                        } else {
                            connectionLost();
                        }
                    }, (error) => {
                        connectionLost();
                    });
            }
        }

        // Removes the last waypoint added to our waypoints 
        function deleteLatestWaypoint() {
            $scope.waypoints.pop();
            $http.post(PATH + '/api/route',
                {
                    'waypoints': $scope.waypoints
                } 
                ).then((response) => {
                    if (response.data.success) {
                        $scope.waypoints = response.data.waypoints;
                        addNotification("Deleted Waypoint");
                    } else {
                        connectionLost();
                    }
                }, (error) => {
                    connectionLost();
                });
        }

 /*       //Opens a new window with a live stream of the camera at the IP address sent
 */
        function cameraIP() {  // future iteration item
            alert("A new camera stream IP address has been opened.");
        }

        function getCameraIP(){  //future iteration item
        
        }

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

        //Sends a force restart command to the rover
        function eStopButton() {
            alert("ESTOP PRESSED! Rover is force restarting.");
            $http.get(PATH + '/api/emergency-stop')
                .then ((response) => {
                    if (response.data.success) {
                        // TODO: add notigiation through http call 
                        addNotification("ESTOP PRESSED! Rover is force restarting.");
                    } else {
                        connectionLost();
                    }
                }, (error) => {
                    connectionLost();
                });
        }

        function connectionLost() {
            alert("Connection lost to server");
            // todo: consider if we try some other reconnection or something
        }

        init();
	}

	})();