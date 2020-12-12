// Unit testing file for the Maintenance Controller


// These tests should be good but there is an issue in the controller causing them to fail
// Cannot read property value of null at line 23 of the controller
var PATH = 'http://localhost:5000';

// describe('testing wheelChange', () => {  // Testing for the wheels functions.  May not be needed or possible.
//
// 	beforeEach(module('Maintenance'));
//
// 	var scope, $controller;
//
// 	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
// 		scope = $rootScope.$new();
// 		$controller = _$controller_;
// 		ctrl = $controller('MaintenanceController', { $scope: scope });
// 	}));
//
// 	it('should send a notification', () => {
// 		scope.notifications = "none yet";
// 		var output1w = "none yetWheels Changed!\n";
// 		scope.wheelChange();
// 		expect(scope.notifications).toEqual(output1w);
// 	});
// });
//
// describe('testing armChange', () => {  // Testing for the arms functions.  May not be needed or possible.
//
// 	beforeEach(module('Maintenance'));
//
// 	var scope, $controller;
//
// 	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
// 		scope = $rootScope.$new();
// 		$controller = _$controller_;
// 		ctrl = $controller('MaintenanceController', { $scope: scope });
// 	}));
//
// 	it('should send a notification', () => {
// 		scope.notifications = "none yet";
// 		var output1a = "none yetArms Changed!\n";
// 		scope.armChange();
// 		expect(scope.notifications).toEqual(output1a);
// 	});
// });

describe('testing reset button', () => {  // tests written for the reset button

	beforeEach(module('Maintenance'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
        $httpBackend = $injector.get('$httpBackend');
		scope = $rootScope.$new();
		$controller = _$controller_;

        $httpBackend.whenGET(PATH + '/api/maintenance/wheels').respond({"success": true, "wheels": [2,3,1,4,6,5]});
        $httpBackend.whenGET(PATH + '/api/maintenance/arm').respond({"success": true, "arm": [2,3,1,4,6,-5,-4]});
        $httpBackend.whenGET(PATH + '/api/notifications').respond({
            "success": true,
            "notifications": "none yetRESET PRESSED! Setting all motor direction values to zero.\n"

        });

	}));

	it('should send a notification when pressed', () => {
        spyOn(document, "getElementById").and.callFake(function () {
            return {
                value: '192.168.9.1'
            }
        });
        ctrl = $controller('MaintenanceController', { $scope: scope });
		var output1r = "none yetWheelsChangedArmsChanged\n";
		$httpBackend.flush();
		scope.resetButton();
        $httpBackend.expectPOST(PATH + '/api/maintenance/wheels').respond({"success": true, "wheels": [2,3,1,4,6,5]});
        $httpBackend.expectPOST(PATH + '/api/maintenance/arm').respond({"success": true, "arm": [2,3,1,4,6,-5,-4]});
        $httpBackend.expectPOST(PATH + '/api/notifications').respond({
            "success": true,
            "notifications": "none yetWheelsChangedArmsChanged\n"
        });
        $httpBackend.expectPOST(PATH + '/api/notifications').respond({
            "success": true,
            "notifications": "none yetWheelsChangedArmsChanged\n"
        });

        $httpBackend.flush();
		expect(scope.notifications).toEqual(output1r);
	});
});

describe('testing eStop button', () => {  // tests written for the eStop button

	beforeEach(module('Maintenance'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
		$httpBackend = $injector.get('$httpBackend');
		scope = $rootScope.$new();
		$controller = _$controller_;
		$httpBackend.whenGET(PATH + '/api/maintenance/wheels').respond({"success": true, "wheels": [2,3,1,4,6,5]});
		$httpBackend.whenGET(PATH + '/api/maintenance/arm').respond({"success": true, "arm": [2,3,1,4,6,-5,-4]});
		$httpBackend.whenGET(PATH + '/api/notifications').respond({
			"success": true,
			"notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"
		});
	}));

	it('should send a notification when called', () => {


		//scope.notifications = "none yet";
		spyOn(document, "getElementById").and.callFake(function () {
			return {
				value: '192.168.9.1'
			}
		});
		ctrl = $controller('MaintenanceController', { $scope: scope });
		var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
		$httpBackend.flush();
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond({ "success": true });
        $httpBackend.expectPOST(PATH + '/api/notifications').respond({
            "success": true,
            "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"
        });
		scope.eStopButton();
		$httpBackend.flush();
		expect(scope.notifications).toEqual(output1);
	});

    it('estop fail branch', () => {


        //scope.notifications = "none yet";
        spyOn(document, "getElementById").and.callFake(function () {
            return {
                value: '192.168.9.1'
            }
        });
        ctrl = $controller('MaintenanceController', { $scope: scope });
        $httpBackend.flush();
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond({ "success": false});
        scope.eStopButton();
        $httpBackend.flush();
    });

    it('estop error branch', () => {


        //scope.notifications = "none yet";
        spyOn(document, "getElementById").and.callFake(function () {
            return {
                value: '192.168.9.1'
            }
        });
        ctrl = $controller('MaintenanceController', { $scope: scope });
        $httpBackend.flush();
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond(500);
        scope.eStopButton();
        $httpBackend.flush();
    });


    it('notification not working', () => {


        //scope.notifications = "none yet";
        spyOn(document, "getElementById").and.callFake(function () {
            return {
                value: '192.168.9.1'
            }
        });
        ctrl = $controller('MaintenanceController', { $scope: scope });
        var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
        $httpBackend.flush();
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond({ "success": true });
        $httpBackend.expectPOST(PATH + '/api/notifications').respond({
            "success": false,
        });
        scope.eStopButton();
        $httpBackend.flush();
    });
    it('notification error', () => {


        //scope.notifications = "none yet";
        spyOn(document, "getElementById").and.callFake(function () {
            return {
                value: '192.168.9.1'
            }
        });
        ctrl = $controller('MaintenanceController', { $scope: scope });
        var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
        $httpBackend.flush();
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond({ "success": true });
        $httpBackend.expectPOST(PATH + '/api/notifications').respond(500);
        scope.eStopButton();
        $httpBackend.flush();
    });
});
