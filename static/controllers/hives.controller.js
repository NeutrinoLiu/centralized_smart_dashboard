(function() {
    var app = angular.module('hives', []);
    app.controller('hivesController', ['$scope', '$window', '$http', hivesController]);

    function hivesController($scope, $window, $http) {
        $scope.editHive = editHive;
        $scope.deleteHive = deleteHive;
        $scope.addHive = addHive;
        $scope.hives;

        function loadHives() {
            // TODO: load hives from storage
            $scope.hives = [
                {name:'name1', id:'1'},
                {name:'name2', id:'2'},
                {name:'name3', id:'3'},
                {name:'name4', id:'4'},
                {name:'name5', id:'5'},
                {name:'name6', id:'6'}
            ];
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
            let newHiveId = ($scope.hives.length == 0 ? "1" : (parseInt($scope.hives[$scope.hives.length-1].id) + 1).toString());
            $scope.hives = $scope.hives.concat([{id: newHiveId}])
            console.log($scope.hives)
        }

        loadHives();
    }
})();
