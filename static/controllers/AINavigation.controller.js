(function() {

    var app = angular.module('AINavigation', ['panzoom', 'panzoomwidget']);
    app.controller('AINavigationController', ['$scope', '$window', '$http', 'PanZoomService', AINavigationController]);

    function AINavigationController($scope, $window, $http, PanZoomService) {
        $scope.homepage = homepage;
        $scope.waypointNew = waypointNew;
        $scope.cameraIP = cameraIP;
        $scope.goButton = goButton;
        $scope.eStopButton = eStopButton;
        $scope.deleteLatestWaypoint = deleteLatestWaypoint;

        $scope.waypoints = [];
        $scope.curr_coord = {'lat': 0, 'long':0};
        $scope.notifications = "none yet";


        // todo: check correct var for this
        var initial_zoom = {
            x: 10,
            y: -84,
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
                    waypoints: [{'lat': 9.958869, 'long': -83.985763}, {'lat': 43.075441, 'long': -89.404075}],
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
            position = coordToXY(waypoint.lat, waypoint.long);
            waypoint['x_pos'] = position['x'];
            waypoint['y_pos'] = position['y'];
            waypoint['index'] = 'point-' + $scope.waypoints.length + 1;
            return waypoint;
        }

        function lat2y(lat) { return Math.log(Math.tan((lat / 90 + 1) * PI_4 )) * RAD2DEG; }
        function lon2x(lon) { return lon; }

        function coordToXY(latitude, longitude) {
            /*
            Algorithm to change from coord to XY with the pixel scaling factor
            Scaling factor for latitude and longitude was manually calculated from pixel length
            and height of the map.
            TODO: Take the difference from the current Latitude and longitude for the proper coordinates
            // */

            RAD2DEG = 180 / Math.PI;
            PI_4 = Math.PI / 4;
            x_pos = lon2x(longitude);
            y_pos =  lat2y(latitude);

            return {'x': x_pos, 'y': y_pos};
        }

        function addWaypointToMap(waypoint) {
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
                    $scope.waypoints.push({'lat': response.data.lat, 'long': response.data.long});
                    $scope.notifications += "New Waypoint Added" + '\n';
                    addWaypointToMap(fullWaypoint(response.data));
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

        //Sends the first target waypoint in the list to the rover
        function goButton() {
            if ($scope.waypoints.length != 0) {
                alert("GO Command Sent! The rover is moving to the top waypoint.");
                // todo: POST to fo button endpoint
                $http.get(PATH + '/api/go-button')
                    .then ((response) => {
                        if ( response.data.success) {
                            // todo: change colors of waypoints, or something in map
                            $scope.notifications += "GO button pressed! Rover is moving." + '\n';

                        } else {
                            connectionLost();
                        }
                    }, (error) => {
                        connectionLost();
                    });
            } else {
                alert("No waypoint added. Set a waypoint first");
            }
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