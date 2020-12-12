// Unit testing file for the Cameras Controller
// May need to add some includes at the top, not sure what to add though
var PATH = 'http://localhost:5000';

describe('CAMERA Testing init', () =>{
    beforeEach(module('cameras'));
    var scope, $controller, $httpBackend;
    beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
        $httpBackend = $injector.get('$httpBackend');

        scope = $rootScope.$new();
        $controller = _$controller_;

        ctrl = $controller('CamerasController', { $scope: scope });
    }));

    it('CAMERA testing init', () =>{
		$httpBackend.expectGET(PATH + '/api/notifications').respond({"success": true, "notifications": ""});
        $httpBackend.expectGET(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
        //$httpBackend.expectGET(PATH + '/api/notifications').respond({"success": true, "notifications": ""});
        //$httpBackend.expectGET(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
		//scope.init();

		$httpBackend.flush();

	})

});

 describe('testing homepage function', () => {  // Based on code written in the AINavigation tests

	beforeEach(module('cameras'));

});

describe('testing addNotification', () => {

	beforeEach(module('cameras'));

	var scope, $controller, $httpBackend;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
	    $httpBackend = $injector.get('$httpBackend');
		scope = $rootScope.$new();
		$controller = _$controller_;
	}));

	it('should send a notification', () => {
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.notifications = "none yet"
		var output1 = "none yetNew Notification Sent To Server\n";
		scope.addNotification("New Notification Sent To Server");
		expect(scope.notifications).toEqual(output1);
	});
});

describe('testing removeLatestCamera function', () => {

	beforeEach(module('cameras'));

	var scope, $controller, $httpBackend;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
	    $httpBackend = $injector.get('$httpBackend');
	    scope = $rootScope.$new();
		$controller = _$controller_;
		$httpBackend.whenGET(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
		$httpBackend.whenGET(PATH + '/api/notifications').respond({"success": true,
	     "notifications": "New IP address for a camera added\n"});
	}));

	it('should remove the latest camera', () => {  //
	       	    $httpBackend.expectPOST(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
	       	     $httpBackend.expectPOST(PATH + '/api/notifications').respond({"success": true,
	     "notifications": "New IP address for a camera added\n"});
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.cameraIPs = ['192.168.1.14', '192.168.1.23'];  // fill in with 2 camera IPs of right format
		scope.removeLatestCamera();
		var output1C = ['192.168.1.14'];  // fill in with 1 camera IP of right format
		expect(scope.cameraIPs).toEqual(output1C);  //check for match
		$httpBackend.flush()
	});

	it('should do nothing with no cameras', () => {
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.cameraIPs = [];
		scope.removeLatestCamera();
		var output2C = [];
		expect(scope.cameraIPs).toEqual(output2C);
	});

	/* it('should go into the fail branch', () => {  // errors right now
		       	    $httpBackend.expectPOST(PATH + '/api/ips').respond({"success": false, "ips": ["192.343.142.2"]});
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.removeLatestCamera();
		$httpBackend.flush();
	});  */

	/* it('should error', () => {  // errors right now
			       	    $httpBackend.expectPOST(PATH + '/api/ips').respond(500);
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.removeLatestCamera();
		$httpBackend.flush();
	}); */

	afterAll(() => {  // empty cameraIPs at end of tests to avoid bugs
		scope.cameraIPs = [];
	});
});

describe('testing addIP function', () => {  // tests written to test the addIP function

	beforeEach(module('cameras'));

	var scope, $controller, $httpBackend;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
	    $httpBackend = $injector.get('$httpBackend');
		scope = $rootScope.$new();
		$controller = _$controller_;
		scope.notifications = "";
		$httpBackend.whenGET(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
        $httpBackend.whenGET(PATH + '/api/notifications').respond({"success": true,
            "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"});

	}));

	it('should give us a notification', () => {  // Should give a notification when done
		$httpBackend.expectGET(PATH + '/api/notifications').respond({"success": true,
	     "notifications": "New IP address for a camera added\n"});
       $httpBackend.expectGET(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
       $httpBackend.expectPOST(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
       $httpBackend.expectPOST(PATH + '/api/notifications').respond({"success": true,
	     "notifications": "New IP address for a camera added\n"});
	    spyOn(document, "getElementById").and.callFake(function() {
            return {
           value: '192.168.9.1'
                }
            });
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.addIP();
		var output = "New IP address for a camera added\n";
		$httpBackend.flush();
		expect(scope.notifications).toEqual(output);
	});

	it('should go into the fail branch', () => {
		$httpBackend.expectGET(PATH + '/api/ips').respond({"success": false, "ips": ["192.343.142.2"]});
		$httpBackend.expectPOST(PATH + '/api/ips').respond({"success": false, "ips": ["192.343.142.2"]});
	    spyOn(document, "getElementById").and.callFake(function() {
            return {
           value: '192.168.9.1'
                }
            });
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.addIP();
		var output = "New IP address for a camera added\n";
		$httpBackend.flush();
	});

	it('should error', () => {
		$httpBackend.expectGET(PATH + '/api/ips').respond(500);
		$httpBackend.expectPOST(PATH + '/api/ips').respond(500);
	    spyOn(document, "getElementById").and.callFake(function() {
            return {
           value: '192.168.9.1'
                }
            });
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.addIP();
		var output = "New IP address for a camera added\n";
		$httpBackend.flush();
	});

	/* it('should ignore bad input', () => {  // Not sure how to mock this
		ctrl = $controller('CamerasController', { $scope: scope });

	});  */

});

describe('testing eStop button', () => {  // tests written for the eStop button

	beforeEach(module('cameras'));

	var scope, $controller, $httpBackend;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
	    $httpBackend = $injector.get('$httpBackend');
	    scope = $rootScope.$new();
		$controller = _$controller_;
        $httpBackend.whenGET(PATH + '/api/ips').respond({"success": true, "ips": ["192.343.142.2"]});
        $httpBackend.whenGET(PATH + '/api/notifications').respond({"success": true,
            "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"});
	}));

	it('should send a notification when called', () => {
		$httpBackend.expectGET(PATH + '/api/emergency-stop').respond({"success": true});
        $httpBackend.expectPOST(PATH + '/api/notifications').respond({"success": true,
            "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"});
		//scope.notifications = "none yet";
		ctrl = $controller('CamerasController', { $scope: scope });
		var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
		scope.eStopButton();
		$httpBackend.flush();
        expect(scope.notifications).toEqual(output1);
	});

	it('should go into the fail branch', () => {
		$httpBackend.expectGET(PATH + '/api/emergency-stop').respond({"success": false});
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.eStopButton();
		$httpBackend.flush();
	});

	it('should error', () => {
		$httpBackend.expectGET(PATH + '/api/emergency-stop').respond(500);
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.eStopButton();
		$httpBackend.flush();
	});
});
