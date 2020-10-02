(function() {
    var app = angular.module('hives', []);
    app.controller('hivesController', ['$scope', '$window', '$http', hivesController]);

    function hivesController($scope, $window, $http) {
        $scope.editHive = editHive;
        $scope.deleteHive = deleteHive;
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
            console.log(hiveId);
        }

        function addHive() {
            // TODO: call hive backend class to remove this
            console.log("Add hive");
        }

        loadHives();
    }
})();
