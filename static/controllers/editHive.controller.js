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

        const PATH = "http://localhost:5000";

        const urlParams = new URLSearchParams(window.location.search);

        function init() {
            //TODO: get this from python backend
            getHiveId();
            $http.post( PATH + '/api/edit-hive', 
                    {
                    'update': false,
                    'hiveID': $scope.hiveId
                    }
                )
                .then( (response) => {
                    console.log(response);
                    $scope.health = response.data.health;
                    $scope.honeyStores = response.data.honeyStores;
                    $scope.honeyStores = response.data.honeyStores;
                    $scope.queenProduction = response.data.queenProduction;
                    $scope.equipment = response.data.equipment;
                    $scope.losses = response.data.losses;
                    $scope.gains = response.data.gains;

                }, (error) => {
                    console.log('Error from post');
                });
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
            var equipment = document.getElementById("equipment").value;
            var equipment_inventory = document.getElementById("equipment").value;
            var losses = document.getElementById("losses").value;
            var gains = document.getElementById("gains").value;

            var validUpdate = health && honeyStores &&
                queenProd && hiveequipment && invequipment && losses && gains;

            if (validUpdate) {
                // parameter is 
                $http.post( PIN_PATH + '/api/edit-hive', 
                    {
                    'update': true,
                    'hiveID': $scope.hiveId,
                    'health': health,
                    'honeyStores': honeyStores,
                    'queenProduction': queenProd,
                    'equipment_hive': equipment,
                    'equipment_inventory': equipment_inventory,
                    'losses': losses,
                    'gains': gains
                    }
                )
                .then( (response) => {
                    $scope.health = response.data.health;
                    $scope.honeyStores = response.data.honeyStores;
                    $scope.honeyStores = response.data.honeyStores;
                    $scope.queenProduction = response.data.queenProduction;
                    $scope.equipment = response.data.equipment;
                    $scope.losses = response.data.losses;
                    $scope.gains = response.data.gains;

                }, (error) => {
                    console.log('Error from post');
                });

                // TODO: consider storing old info in previows rows
                // TODO: ADD PYTHON BACKEND CODE TO UPDATE LOCAL SERVER FILE WITH THIS INFO
                // const header = ["Health", "Honey Stores", "Queen Production", "Hive Equipment", "Inventory Equipment", "Losses", "Gains"];
                // const data = [health, honeyStores, queenProd, hiveequipment, invequipment, losses, gains];
                // let csvContent = "data:text/csv;charset=utf-8," + header + "\r\n" + data + "\r\n";
                // var encodedUri = encodeURI(csvContent);
                // var link = document.createElement("a");
                // link.setAttribute("href", encodedUri);
                // link.setAttribute("download", "hive_"+$scope.hiveId+".csv");
                // document.body.appendChild(link); // Required for FF
                // link.click();
                // $window.location.href ="/hives";


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
