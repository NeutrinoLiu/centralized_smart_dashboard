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
		scope.init();
		//$httpBackend.flush();

	})

});

describe('Testing waypoint new', () => {
	beforeEach(module('ERDM'));
	var scope, $controller, $httpBackend;
	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
		$httpBackend = $injector.get('$httpBackend');

		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('ERDMController', { $scope: scope });
	}));

	it('testing waypoint new', () => {
		$httpBackend.expectPOST(PATH + '/api/route').respond({ "success": true, "waypoints": [{ "lat": 56.42, "long": 58.4 }] });
		//$httpBackend.expectGET(PATH + '/api/gps').respond({"success": true, "lat": 56.43, "long": 58.5});
		//$httpBackend.expectGET(PATH + '/api/notifications').respond({"success": true, "notifications": ""});
		scope.waypointNew();
		//$httpBackend.flush();

	})

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

		initHandler = $httpBackend.when('GET', '/api/route').respond({ "success": true, "data": { "waypoints": [] } })
	}));

	beforeEach(() => {

		scope.notifications = "none yet";
	});

	//afterEach(function () {
	//	$httpBackend.verifyNoOutstandingExpectation();
	//	$httpBackend.verifyNoOutstandingRequest();
	//});

	const output1 = "none yetNew Notification Sent To Server\n";
	const output2 = "none yetHello\nThis\nIs A New\nNotification\nThat We\nSent!\n";
	const output3 = "none yet\n";

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

describe('testing ESTOP button', () => {  // tests the ESTOP button javscript function

	beforeEach(module('ERDM'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('ERDMController', { $scope: scope });
	}));

	beforeEach(() => {
		scope.notifications = "none yet";
	});

	const output1 = "none yetESTOP PRESSED! Rover is force restarting.\n"

	it('Estop button notification called', () => {  // checks that the notification popped up when the function called
		scope.eStopButton();
		expect(scope.notifications).toEqual(output1);
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


///*
// * this tests adding valid waypoints. i'm going to pretend the function call is waypointnew(lat, long) simply because
// * i'm not sure how to simulate the document.getelementbyid
// */
//describe('testing waypointnew', () => {

//	beforeeach(() => {
//		$scope.waypoints = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }]
//	});

//	const output1 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }];
//	const output2 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
//	const output3 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': -90, 'long': -180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
//	const output4 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 90, 'long': 180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
//	const output5 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 0, 'long': 0, 'x_pos': 0, 'y_pos': 0, 'index': 2 }];
	

//	//null input tests invalid and doesn't add a waypoint
//	test('test with null latitude', () => {
//		//call with invalid input with null latitude;
//		waypointnew("", 1);

//		expect($scope.waypoints).toequal(output1);
//	});

//	//null input tests invalid and doesn't add a waypoint
//	test('test with null longitude', () => {
//		//call with invalid input with null longitude;
//		waypointnew(1, "");

//		expect($scope.waypoints).toequal(output1);
//	});

//	//ensures test with valid input adds point; todo: ensure that output constants are correct
//	test('test with valid input', () => {
//		waypointnew(23, 23);

//		expect($scope.waypoints).toequal(output2);
//	});

//	//test with long that's too negative
//	test('test with too small input', () => {
//		//call with invalid input with null longitude;
//		waypointnew(1, -2000);

//		expect($scope.waypoints).toequal(output1);
//	});

//	//test with long that's too large and positive
//	test('test with too large input', () => {
//		//call with invalid input with null longitude;
//		waypointnew(1, 2000);

//		expect($scope.waypoints).toequal(output1);
//	});

//	//test with lat that's too negative
//	test('test with too small input', () => {
//		//call with invalid input with null longitude;
//		waypointnew(-2000, 1);

//		expect($scope.waypoints).toequal(output1);
//	});

//	//test with lat that's too large and positive
//	test('test with too large input', () => {
//		//call with invalid input with null longitude;
//		waypointnew(2000, 1);

//		expect($scope.waypoints).toequal(output1);
//	})


//	//test with invalid input within a few valid entries
//	//only concerned about statement coverage for now... brenna very tired
//	test('test with valid input, then invalid input, then valid input', () => {

//	});

//	//tests valid input with most negative input; 
//	test('test with most negative input', () => {
//		waypointnew(-90, -180);

//		expect($scope.waypoints).toequal(output3);
//	});

//	//tests valid input with most positive input
//	test('test with most positive input', () => {
//		waypointnew(90, 180);

//		expect($scope.waypoints).toequal(output4);
//	});

//	// testing output for input of 0,0
//	test('test with inputs of 0', () => {
//		waypointnew(0, 0);

//		expect(coordtoxy(lat, long)).toequal(output5);
//	});

//	//test with many valid inputs (many = 5?)

//	//empties global waypoints variable
//	afterall(() => {
//		$scope.waypoints = [];
//	});
//});

