(function() {
    var app = angular.module('editHive', []);
    app.controller('editHiveController', ['$scope', '$window', '$http', editHiveController]);

    function editHiveController($scope, $window, $http) {
        $scope.hiveId;

        $scope.update = update;

        const urlParams = new URLSearchParams(window.location.search);

        function getHiveId() {
            $scope.hiveId = urlParams.get('hiveId');
        }

        function update() {
            var health = document.getElementById("editHealth").value;  
            var inspection = document.getElementById("rofInspection").value;
            var honeyStores = document.getElementById("hstores").value;
            var queenProd = document.getElementById("qproduction").value;
            var equipment = document.getElementById("equipment").value;
            var losses = document.getElementById("losses").value;
            var gains = document.getElementById("gains").value;

            var validUpdate = health && honeyStores &&
                queenProd && equipment && losses && gains;

            if (validUpdate) {
                // TODO: consider storing old info in previows rows
                // TODO: ADD PYTHON BACKEND CODE TO UPDATE LOCAL SERVER FILE WITH THIS INFO
                const header = ["Health", "Honey Stores", "Queen Production", "Equipment", "Losses", "Gains"];
                const data = [health, honeyStores, queenProd, equipment, losses, gains];
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

        getHiveId();

    }
})();
