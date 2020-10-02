(function() {
    var app = angular.module('editHive', []);
    app.controller('editHiveController', ['$scope', '$window', '$http', editHiveController]);

    function editHiveController($scope, $window, $http) {
        $scope.hiveId;
        $scope.health;
        $scope.inspection;
        $scope.honeyStores;
        $scope.queenprod;
        $scope.hiveequipment;
        $scope.invequipment;
        $scope.losses;
        $scope.gains;
        $scope.hives = hives;

        $scope.update = update;

        const urlParams = new URLSearchParams(window.location.search);

        function init() {
            //TODO: get this from python backend
            getHiveId();
            $scope.health = "sample health";
            $scope.inspection = "sample inspection";
            $scope.honeyStores = "sample honeyStores";
            $scope.queenProd = "sample queenprod";
            $scope.hiveequipment = "sample hive equipment";
            $scope.invequipment = "sample invenvtory equipment";
            $scope.losses = "sample losses";
            $scope.gains = "sample gains";
        }

        function hives() {
            $window.location.href = "/hives";
        }

        function getHiveId() {
            $scope.hiveId = urlParams.get('hiveId');
        }

        function update() {
            var health = document.getElementById("editHealth").value;  
            var inspection = document.getElementById("rofInspection").value;
            var honeyStores = document.getElementById("hstores").value;
            var queenProd = document.getElementById("qproduction").value;
            var equipment = document.getElementById("hiveequipment").value;
            var equipment = document.getElementById("invequipment").value;
            var losses = document.getElementById("losses").value;
            var gains = document.getElementById("gains").value;

            var validUpdate = health && honeyStores &&
                queenProd && hiveequipment && invequipment && losses && gains;

            if (validUpdate) {
                // TODO: consider storing old info in previows rows
                // TODO: ADD PYTHON BACKEND CODE TO UPDATE LOCAL SERVER FILE WITH THIS INFO
                const header = ["Health", "Honey Stores", "Queen Production", "Hive Equipment", "Inventory Equipment", "Losses", "Gains"];
                const data = [health, honeyStores, queenProd, hiveequipment, invequipment, losses, gains];
                let csvContent = "data:text/csv;charset=utf-8," + header + "\r\n" + data + "\r\n";
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "hive_"+$scope.hiveId+".csv");
                document.body.appendChild(link); // Required for FF
                link.click();
                $window.location.href ="/hives";
            } else {
                invalidUpdate();
            }
        }

        function invalidUpdate() {
            console.log('Invalid update');
        }

        init();

    }
})();
