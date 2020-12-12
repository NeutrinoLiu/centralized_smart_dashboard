// unit testing file for the erdm controller

//This test ensures that each field of waypoint is not null
var PATH = 'http://localhost:5000';

describe('Testing init', () => {
	beforeEach(module('ERDM'));
	var scope, $controller, $httpBackend;
	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
		$httpBackend = $injector.get('$httpBackend');

		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('ERDMController', { $scope: scope });
	}));

	it('testing init', () => {
		$httpBackend.expectGET(PATH + '/api/route').respond({ "success": true, "waypoints": [{ "lat": 56.42, "long": 58.4 }] });
		$httpBackend.expectGET(PATH + '/api/gps').respond({ "success": true, "lat": 56.43, "long": 58.5 });
		$httpBackend.expectGET(PATH + '/api/notifications').respond({ "success": true, "notifications": "" });
		$httpBackend.flush();

	});

	it('testing init fail branch 1', () =>{
        $httpBackend.expectGET(PATH + '/api/route').respond(500);
        $httpBackend.expectGET(PATH + '/api/gps').respond(500);
        $httpBackend.expectGET(PATH + '/api/notifications').respond(500);
        $httpBackend.flush();

    });

});

describe('Testing waypoint new', () => {
	beforeEach(module('ERDM'));
	var scope, $controller, $httpBackend;
	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
		$httpBackend = $injector.get('$httpBackend');

		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('ERDMController', { $scope: scope });
		scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 'point-1'}];
	}));

	it('testing waypoint new', () => {
		$httpBackend.expectPOST(PATH + '/api/route').respond({ "success": true, "waypoints": [{ "lat": 56.42, "long": 58.4 }] });
		//$httpBackend.expectGET(PATH + '/api/gps').respond({"success": true, "lat": 56.43, "long": 58.5});
		//$httpBackend.expectGET(PATH + '/api/notifications').respond({"success": true, "notifications": ""});
		scope.waypointNew();
		//$httpBackend.flush();

	});

	var output1 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 'point-1'}];
	var output2 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 'point-1' }, { 'lat': 23, 'long': 23, 'x_pos': -1495, 'y_pos': -2990, 'index': 'point-2' }];
	var output3 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 'point-1' }, { 'lat': -90, 'long': -180, 'x_pos': -11700, 'y_pos': -11700, 'index': 'point-2' }];
	var output4 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 'point-1' }, { 'lat': 90, 'long': 180, 'x_pos': -11700, 'y_pos': -11700, 'index': 'point-2' }];
	var output5 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 'point-1' }, { 'lat': 0, 'long': 0, 'x_pos': 0, 'y_pos': 0, 'index': 'point-2' }];
	//const output6 = ;

	//Null input tests invalid and doesn't add a waypoint
	it('test with empty latitude', () => {
		//Call with invalid input with empty latitude;
		scope.waypointNewLatitude = "";
		scope.waypointNewLongitude = 1;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output1);
	});

	//Null input tests invalid and doesn't add a waypoint
	it('test with empty longitude', () => {
		//Call with invalid input with null longitude;
		scope.waypointNewLatitude = 1;
		scope.waypointNewLongitude = "";
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output1);
	});

	//Test with long that's too negative
	it('test with too small input longitude', () => {
		scope.waypointNewLatitude = 1;
		scope.waypointNewLongitude = -2000;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output1);
	});

	//Test with long that's too large and positive
	it('test with too large input longitude', () => {
		scope.waypointNewLatitude = 1;
		scope.waypointNewLongitude = 2000;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output1);
	});

	//Test with lat that's too negative
	it('test with too small input latitude', () => {
		scope.waypointNewLatitude = -2000;
		scope.waypointNewLongitude = 1;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output1);
	});

	//Test with lat that's too large and positive
	it('test with too large input latitude', () => {
		scope.waypointNewLatitude = 2000;
		scope.waypointNewLongitude = 1;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output1);
	});

	//Ensures test with valid input adds point; TODO: ensure that output constants are correct
	it('test with valid input', () => {
		scope.waypointNewLatitude = 23;
		scope.waypointNewLongitude = 23;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output2);
	});

	//Test with invalid input within a few valid entries
	//only concerned about statement coverage for now... Brenna very tired
	it('test with valid input, then invalid input, then valid input', () => {

	});

	//Tests valid input with most negative input; 
	it('test with most negative input', () => {
		scope.waypointNewLatitude = -90;
		scope.waypointNewLongitude = -180;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output3);
	});

	//Tests valid input with most positive input
	it('test with most positive input', () => {
		scope.waypointNewLatitude = 90;
		scope.waypointNewLongitude = 180;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output4);
	});

	// Testing output for input of 0,0
	it('test with inputs of 0', () => {
		scope.waypointNewLatitude = 0;
		scope.waypointNewLongitude = 0;
		scope.waypointNew();

		expect(scope.waypoints).toEqual(output5);
	});

	//Test with many valid inputs (many = 5?)

	//Empties global waypoints variable
	afterAll(() => {
		scope.waypoints = [];
	});

});

describe('testing update rover coordinates', () => {  // tests written for the update rover coordinates button

    beforeEach(module('ERDM'));

    var scope, $controller, $httpBackend;

    beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
        $httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        $controller = _$controller_;
        $httpBackend.whenGET(PATH + '/api/route').respond({"success": true, "waypoints":[{"lat": 56.42, "long": 58.4},
                {"lat": 23.4, "long": -32.5}]});
        $httpBackend.expectGET(PATH + '/api/gps').respond({"success": true, "lat": 56.43, "long": 58.5});
        $httpBackend.whenGET(PATH + '/api/notifications').respond({"success": true,
            "notifications": "none yet"});
    }));

    it('should send a notification when called', () => {
        spyOn(document, "getElementById").and.callFake(function() {
            return {
                style: ''
            }
        });
        $httpBackend.expectGET(PATH + '/api/gps').respond({"success": true, "lat": 57.43, "long": 58.5});
        ctrl = $controller('ERDMController', {$scope: scope});
        scope.updateRoverCoordinates();
        $httpBackend.flush();
        //expect(scope.notifications).toEqual(output1);
    });
});

describe('Testing fullWaypoint', () => {

	beforeEach(module('ERDM'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('ERDMController', { $scope: scope });
	}));

	//Gives a waypoint with only latitude and longitude to the function
	beforeEach(() => {
		testWaypoint = { 'lat': 10, 'long': 20 };
	});

	//Tests that lat is not null
	it('testWaypoint[lat] not null', () => {
		scope.fullWaypoint(testWaypoint);

		expect(testWaypoint['lat']).not.toBeNull();
	});

	//Tests that long is not null
	it('testWaypoint[long] not null', () => {
		scope.fullWaypoint(testWaypoint);

		expect(testWaypoint['long']).not.toBeNull();
	});

	//Tests that index is not null
	it('testWaypoint[index] not null', () => {
		scope.fullWaypoint(testWaypoint);

		expect(testWaypoint['index']).not.toBeNull();
	});

	//Tests that x_pos is not null
	it('testWaypoint[x_pos] not null', () => {
		scope.fullWaypoint(testWaypoint);

		expect(testWaypoint['x_pos']).not.toBeNull();
	});

	//Tests that y_pos is not null
	it('testWaypoint[y_pos] not null', () => {
		scope.fullWaypoint(testWaypoint);

		expect(testWaypoint['y_pos']).not.toBeNull();
	});

});

describe('testing addNotification', () => {  // testing the addNotification function

	beforeEach(module('ERDM'));

	var scope, $controller, $httpBackend;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
		$httpBackend = $injector.get('$httpBackend');

		// authRequestHandler = $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});  //maybe needed?

		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('ERDMController', { $scope: scope });

		initHandler = $httpBackend.when('GET', '/api/route').respond({"success": true, "data": {"waypoints": []}})
	}));

	beforeEach(() => {

		scope.notifications = "none yet";
	});

	//afterEach(function () {
	//	$httpBackend.verifyNoOutstandingExpectation();
	//	$httpBackend.verifyNoOutstandingRequest();
	//});

	var output1 = "none yetNew Notification Sent To Server\n";
	var output2 = "none yetHello\nThis\nIs A New\nNotification\nThat We\nSent!\n";
	var output3 = "none yet\n";

	it('Notifications are as expected after call', () => {  //test after 1 call that notifications matches
		//$httpBackend.flush();
		$httpBackend.expectPOST(PATH + '/api/notifications', { 'notifications': scope.notifications }).respond();

		scope.addNotification("New Notification Sent To Server");
		//$httpBackend.flush();
		expect(scope.notifications).toEqual(output1);
	});

	it('Notifications are as expected after several calls', () => {  //test after several calls that notifications matches
		scope.addNotification("Hello");
		scope.addNotification("This");
		scope.addNotification("Is A New");
		scope.addNotification("Notification");
		scope.addNotification("That We");
		scope.addNotification("Sent!");

		expect(scope.notifications).toEqual(output2);
	});

	it('Notifications are as expected after empty string', () => {  //test after 1 call that notifications matches
		scope.addNotification("");

		expect(scope.notifications).toEqual(output3);
	});

	//Defaults global notifications variable
	afterEach(() => {
		scope.notifications = "none yet";
	});
});

describe('testing eStop button', () => {  // tests written for the eStop button

    beforeEach(module('ERDM'));

    var scope, $controller, $httpBackend;

    beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
        $httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        $controller = _$controller_;
        $httpBackend.whenGET(PATH + '/api/route').respond({"success": true, "waypoints":[{"lat": 56.42, "long": 58.4},
                {"lat": 23.4, "long": -32.5}]});
        $httpBackend.whenGET(PATH + '/api/gps').respond({"success": true, "lat": 56.43, "long": 58.5});
        $httpBackend.whenGET(PATH + '/api/notifications').respond({"success": true,
            "notifications": "none yet"});
    }));

    it('should send a notification when called', () => {
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond({"success": true});
        $httpBackend.expectPOST(PATH + '/api/notifications').respond({"success": true,
            "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"});
        //scope.notifications = "none yet";
        ctrl = $controller('ERDMController', { $scope: scope });
        var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
        scope.eStopButton();
        $httpBackend.flush();
        expect(scope.notifications).toEqual(output1);
    });
    it('estop failure', () => {
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond({"success": false});
        //$httpBackend.expectPOST(PATH + '/api/notifications').respond({"success": true,
        //    "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"});
        //scope.notifications = "none yet";
        ctrl = $controller('ERDMController', { $scope: scope });
        var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
        scope.eStopButton();
        $httpBackend.flush();
        //expect(scope.notifications).toEqual(output1);
    });
    it('estop failure', () => {
        $httpBackend.expectGET(PATH + '/api/emergency-stop').respond(500);
        //$httpBackend.expectPOST(PATH + '/api/notifications').respond({"success": true,
        //    "notifications": "none yetESTOP PRESSED! Rover is force restarting.\n"});
        //scope.notifications = "none yet";
        ctrl = $controller('ERDMController', { $scope: scope });
        var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
        scope.eStopButton();
        $httpBackend.flush();
        //expect(scope.notifications).toEqual(output1);
    });
});

/*
This below is the unit testing just for coordToXY. 
*/
describe('Testing coordToXY', () => {  // tests for testing coordToXY.  Expected output for these may be wrong

	beforeEach(module('ERDM'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		var ctrl = $controller('ERDMController', { $scope: scope });
	}));

	//Tests math completed in coordToXY
	it('test with regular input', () => {
		const lat = 53.687;
		const long = 37.993;
		//TODO: Once Docker is up and running, the xpos and ypos can be determined from this. 
		const outputy = -6979.31;
		const outputx = -2469.545;

		expect(scope.coordToXY(lat, long).x).toBeCloseTo(outputx);
		expect(scope.coordToXY(lat, long).y).toBeCloseTo(outputy);
	});

	// Tests for Null Input in coordToXY (not for coordToXY; using as reminder for waypointNew)
	it('test with null input', () => {
		const lat = null;
		const long = null;
		const output = ({'y': 0, 'x': 0});
		//TODO: To check what the null value should return
		expect(scope.coordToXY(lat, long)).toEqual(output);
	});

	//Test that x_pos is greater than 0 with a negative value entered
	it('test xpos is positive with negative value', () => {
		const lat = 0;
		const long = -334;
		var outputx = 0;

		expect(scope.coordToXY(lat,long).x).toBeLessThan(outputx);
	});

	//Test that x_pos is greater than 0 with a positive value entered
	it('test xpos is negative with positive value', () => {
		const lat = 0;
		const long = 10;
		var outputx = 0;

		expect(scope.coordToXY(lat, long).x).toBeLessThan(outputx);
	});

	//Test that y_pos is less than 0 with a negative value entered
	it('test ypos is negative with negative value', () => {
		const lat = -10.1;
		const long = 0;

		expect(scope.coordToXY(lat, long).y).toBeLessThan(0);
	});

	//Test that y_pos is less than 0 with a positive value entered
	it('test ypos is negative with positive value', () => {
		const lat = 10.1;
		const long = 0;

		expect(scope.coordToXY(lat, long).y).toBeLessThan(0);
	});

	//Test that when point A is more west than point B, x_pos for A is less than x_pos for B
	it('west point A.xpos greater than east point B.xpos', () => {
		const latA = 0;
		const longA = 40.1;
		const latB = 0;
		const longB = 80.2;

		const testA = scope.coordToXY(latA, longA);
		const testB = scope.coordToXY(latB, longB);

		expect(testA['x']).toBeGreaterThan(testB['x']);
	});

	//Test that when point A is more north than point B, y_pos for A is less than y_pos for B
	it('north point A.xpos less than south point B.xpos', () => {
		const latA = 80.1;
		const longA = 0;
		const latB = 40.1;
		const longB = 0;

		const testA = scope.coordToXY(latA, longA);
		const testB = scope.coordToXY(latB, longB);

		expect(testA['y']).toBeLessThan(testB['y']);
	});
	
	//The minimum value (save for waypointNew?)
	
	it('test with very large negative input', () => {
		const lat = -89.000000;
		const long = -179.00000;

		expect(scope.coordToXY(lat, long).x).toBeLessThan(0);
		expect(scope.coordToXY(lat, long).y).toBeLessThan(0);
	});

	
	//Making sure that identical waypoints will be added to the same x and y_pos
	//DONE
	
	it('test with same input', () => {
		const lat = 55;
		const long = 55;
		const lat1 = 55;
		const long1 = 55;

		expect(scope.coordToXY(lat, long)).toEqual(scope.coordToXY(lat1,long1));
	});

});

//describe('testing homepage function', () => { //todo check for onclick functions

//	// every instance of home refers to the html homepage, 'homepage' means for the controller method
//	it('should', async(() => {
//		spyon(home, 'homepage');

//		let button = fixture.debugelement.nativeelement.queryselector('button');
//		button.click();

//		fixture.whenstable().then(() => {
//			expect(home.oneditbuttonclick).tohavebeencalled();
//		});
//	}));

//	// tests if the controller gets called when homepage is hit	
//	/*
//	when button for homepage is clicked, then the controller function should be called
//	*/
//	test('test homepage called', () => {

//	});

//	// testing that the path updates when homepage runs
//	test('testing that path updates', () => {

//	});
//});

describe('Testing deleteEarliestWaypoint', () => {  // test the deleteLatestWaypoint functionality

	beforeEach(module('ERDM'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		var ctrl = $controller('ERDMController', { $scope: scope });

		scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2}];  // setup inital waypoints array

	}));

	var output1 = [{'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2}];
	var output2 = [];
	var output3 = [{'lat': 56, 'long': 43, 'x_pos': 7, 'y_pos': 8,'index': 2}];
	var output4 = [{'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 6}, {'lat': 37, 'long': 98, 'x_pos': 15, 'y_pos': 13, 'index': 7}];

	it('test with normal waypoint', () => {  // just test with removing 1 waypoint
		scope.deleteEarliestWaypoint();
		expect(scope.waypoints).toEqual(output1);
	});

	it('test with no waypoints', () => {
		scope.waypoints = [];  // empty array out since we need it empty for this test
		scope.deleteEarliestWaypoint();
		expect(scope.waypoints).toEqual(output2);
	});

	it('test delete then add then delete waypoint', () => {  // calls deleteLatestWaypoint twice and adds a waypoint between the calls
		scope.deleteEarliestWaypoint();
		scope.waypoints.push({'lat': 56, 'long': 43, 'x_pos': 7, 'y_pos': 8,'index': 2});
		scope.deleteEarliestWaypoint();
		expect(scope.waypoints).toEqual(output3);
	});

	it('test with many waypoints', () => {  // calls many times in a row with many waypoints in array
		scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2},
		{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 3}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 4},
		{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 5}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 6},
		{'lat': 37, 'long': 98, 'x_pos': 15, 'y_pos': 13, 'index': 7}];
		scope.deleteEarliestWaypoint();
		scope.deleteEarliestWaypoint();
		scope.deleteEarliestWaypoint();
		scope.deleteEarliestWaypoint();
		scope.deleteEarliestWaypoint();
		expect(scope.waypoints).toEqual(output4);
	});

	//Empties global waypoints variable
	afterAll(() => {
		scope.waypoints = [];
	});

});
