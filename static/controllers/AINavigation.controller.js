(function() {

    var app = angular.module('AINavigation', ['panzoom', 'panzoomwidget']);
    app.controller('AINavigationController', ['$scope', '$window', '$http', 'PanZoomService', AINavigationController]);

    function AINavigationController($scope, $window, $http, PanZoomService) {
        $scope.homepage = homepage;
        $scope.waypointNew = waypointNew;
        $scope.goButton = goButton;
        $scope.eStopButton = eStopButton;
        $scope.deleteEarliestWaypoint = deleteEarliestWaypoint;

        /* Scope functions needed for testing*/
        $scope.coordToXY = coordToXY;
        $scope.fullWaypoint = fullWaypoint;
        $scope.addNotification = addNotification;
        //$scope.init = init;

        $scope.waypoints = [];
        $scope.roverPin;
        $scope.curr_coord = {'lat': 0, 'long':0};
        $scope.notifications = "none yet";

        var initial_zoom = {
            x: 0,
            y: 0,
            width: 10,
            height: 10
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

        function homepage() {  // takes user back to homepage
            $window.location.href = "/home";
        }

        //function init() {
        //    $http.get(PATH + '/api/route')
        //        .then((response) => {
        //            if (response.data.success){
        //                for (index = 0; index < response.data.waypoints.length; index++) {  
        //                    $scope.waypoints.push(fullWaypoint(response.data.waypoints[index]));
        //                }
        //            }
        //        }, (error) => {
        //            connectionLost()
        //        });

        //    $http.get(PATH + '/api/gps')
        //        .then((response) => {
        //            if (response.data.success) {
        //                setInterval(updateRoverCoordinates, GPS_INTERVAL);
        //                $scope.curr_coord.lat = response.data.lat;
        //                $scope.curr_coord.long = response.data.long;
        //                $scope.roverPin = fullRoverPin(response.data);
        //            }
        //        }, (error) => {
        //            connectionLost();
        //        });

        //    $http.get(PATH + '/api/notifications')
        //        .then((response) => {
        //            if (response.data.success) {
        //                $scope.notifications = response.data.notifications;
        //            }
        //        }, (error) => {
        //            connectionLost();
        //        });

        //    $window.onload = function() {
        //        addWaypointToMap();
        //        moveRoverIcon();
        //    }
        //}

        function updateRoverCoordinates() {
            $http.get(PATH + '/api/gps')
                .then((response) => {
                    if (response.data.success) {
                        $scope.curr_coord.lat = response.data.lat;
                        $scope.curr_coord.long = response.data.long;
                        $scope.roverPin = fullRoverPin(response.data);
                        moveRoverIcon();
                    }
                }, (error) => {
                    connectionLost();
                });
        }

        function fullRoverPin(rover) {
            rover['lat'] = parseFloat(rover['lat'])
            rover['long'] = parseFloat(rover['long'])
            position = coordToXY(rover.lat, rover.long);
            rover['x_pos'] = parseFloat(position['x']);
            rover['y_pos'] = parseFloat(position['y']);

            return rover;
        }

        /*
        The fullWaypoint method is a dictionary to hold the latitude, longitude, x and y position of a Waypoint
        @author: piedras77
        */
        function fullWaypoint(waypoint) {
            waypoint['lat'] = parseFloat(waypoint['lat'])
            waypoint['long'] = parseFloat(waypoint['long'])
            position = coordToXY(waypoint.lat, waypoint.long);
            waypoint['x_pos'] = parseFloat(position['x']);
            waypoint['y_pos'] = parseFloat(position['y']);
            waypoint['index'] = 'point-' + ($scope.waypoints.length + 1);

            return waypoint;
        }

        /*
        The coordToXY method takes in latitude and longitude and translates to a x and y position for the map.
        The positions are relative positioning and not absolute positioning on the map
        @author: piedras77, prao7
        */
        function coordToXY(latitude, longitude) {
            /*
            Algorithm to change from coord to XY with the pixel scaling factor
            Scaling factor for latitude and longitude was manually calculated from pixel length
            and height of the map.
            */
            scale_factor = 130;
            x_pos = longitude / 2;
            y_pos = latitude;


            x_pos = (longitude > 0 ? -1 * x_pos : x_pos) * scale_factor;
            y_pos = (latitude > 0 ? -1 * y_pos : y_pos) * scale_factor;

            return {'x': x_pos, 'y': y_pos};
        }

        function moveRoverIcon() {
            // could be undefined on initial load, but this function is called at fixed intervals
            if ($scope.roverPin == null) {
                return;
            }
            
            top_ = $scope.roverPin['y_pos'].toString();
            top_ = top_ + 'px';
            left_ = $scope.roverPin['x_pos'].toString();
            left_ = left_ + 'px';
            document.getElementById("roverPin").style.position = 'absolute';
            document.getElementById("roverPin").style.top = top_;
            document.getElementById("roverPin").style.left = left_;
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
                    width: 10,
                    height: 10
                };

                PanZoomService.getAPI('PanZoom').then(function (api) {
                    api.zoomToFit(point_location);
                });
            }
        }

        //Adds waypoint coordinates to the list
        function waypointNew() {
            var latitude = $scope.waypointNewLatitude;
            var longitude = $scope.waypointNewLongitude;
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
        function deleteEarliestWaypoint() {
            if ($scope.waypoints.length != 0) {
                $scope.waypoints.shift();
                $http.post(PATH + '/api/route',
                    {
                        'waypoints': $scope.waypoints
                    } 
                    ).then((response) => {
                        if (response.data.success) {
                            addNotification("Deleted Waypoint");
                            addWaypointToMap();
                        } else {
                            connectionLost();
                        }
                    }, (error) => {
                        connectionLost();
                    });
            } else {
                alert("No waypoint added. So we cannot remove anything");
            }

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

        //Sends the first target waypoint in the list to the rover
        function goButton() {
            if ($scope.waypoints.length != 0) {
                alert("GO Command Sent! The rover is moving to the top waypoint.");
                $http.get(PATH + '/api/go-button')
                    .then ((response) => {
                        if ( response.data.success) {
                            addNotification("GO button pressed! Rover is moving.");
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
                    if (response.data.success) {
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
            // TODO: consider if we try some other reconnection or something
        }

 //       init();
    }


    })();