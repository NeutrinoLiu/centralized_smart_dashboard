(function() {
    var app = angular.module('hives', []);
    app.controller('hivesController', ['$scope', '$window', '$http', hivesController]);

    function hivesController($scope, $window, $http) {
        $scope.editHive = editHive;
        $scope.deleteHive = deleteHive;
        $scope.addHive = addHive;
        $scope.hives;
        $scope.username;

        const PATH = "http://localhost:5000/";
        const urlParams = new URLSearchParams(window.location.search);

        function loadHives() {
            // TODO: load hives from storage
            $scope.username = urlParams.get('username');
            $scope.hives = [];
            $http.get( PATH + '/api/hives').then( (response) => {
                console.log(response);
            }, (error) => {
            });
        }

        function editHive(hiveId) {
            $window.location.href ="/edit-hive?hiveId="+hiveId;
        }

        function deleteHive(hiveId) {
            // TODO: call hive backend class to remove this

            // id not necessarily math array indxs
            for (i = 0; i < $scope.hives.length; i++) {
                if (parseInt($scope.hives[i].id) == hiveId) {
                    $scope.hives.splice(i, 1);
                    console.log(i);
                }
            }
        }

        function addHive() {
            // TODO: call hive backend class to ADD this
            let newHiveId = ($scope.hives.length == 0 ? "1" : (parseInt($scope.hives[$scope.hives.length-1].hiveID) + 1).toString());
            console.log($scope.hives)
            console.log(newHiveId);
            $http.post( PATH + '/api/add-hive', 
                    {
                        'hiveID': newHiveId,
                        'username': $scope.username
                    }
                ).then( (response) => {
                    if (response.data.success) {
                        $scope.hives = $scope.hives.concat([{hiveID: newHiveId}])
                    }
                }, (error) => {
                });

        }

        loadHives();
    }
})();
