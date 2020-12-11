// Unit testing file for the AI Navigation controller

//Do we even bother with this one???
//
//describe('testing init function', () => {

//	beforeEach(module('AINavigation'));

//	var scope, $controller;

//	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
//		scope = $rootScope.$new();
//		$controller = _$controller_;
//	}));

//	test('test init called', () => {

//	});
//});

//This test ensures that each field of waypoint is not null
const PATH = 'http://localhost:5000';

describe('Testing fullWaypoint', () => {

	beforeEach(module('AINavigation'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('AINavigationController', { $scope: scope });
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

	beforeEach(module('AINavigation'));

	var scope, $controller, $httpBackend;

	beforeEach(inject(function ($rootScope, _$controller_, $injector) {  // inject and mock(?) function
		$httpBackend = $injector.get('$httpBackend');

		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('AINavigationController', { $scope: scope });
	}));

	beforeEach(() => {
		scope.notifications = "none yet";
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	const output1 = "none yetNew Notification Sent To Server\n";
	const output2 = "none yetHello\nThis\nIs A New\nNotification\nThat We\nSent!\n";
	const output3 = "none yet\n";

	it('Notifications are as expected after call', () => {  //test after 1 call that notifications matches
		scope.addNotification("New Notification Sent To Server");
		$httpBackend.expectPOST(PATH + '/api/notifications', { 'notifications': scope.notifications }).respond();
		expect(scope.notifications).toEqual(output1);
		$httpBackend.flush();
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

	beforeEach(module('AINavigation'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('AINavigationController', { $scope: scope });
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

describe('testing GO button', () => {  // tests the GO button javascript function

	beforeEach(module('AINavigation'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		ctrl = $controller('AINavigationController', { $scope: scope });
	}));

	beforeEach(() => {
		scope.notifications = "none yet";
	});

	const output1 = "none yetGO button pressed! Rover is moving.\n"

	it('Go button notification called', () => {  // checks that the notification popped up when the function called
		scope.goButton();
		expect(scope.notifications).toEqual(output1);
	});
});

/*
This below is the unit testing just for coordToXY. 
*/
describe('Testing coordToXY', () => {  // tests for testing coordToXY.  Expected output for these may be wrong

	beforeEach(module('AINavigation'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;

		var ctrl = $controller('AINavigationController', { $scope: scope });
	}));

	//Tests math completed in coordToXY
	it('test with regular input', () => {
		const lat = 53.687;
		const long = 37.993;
		//TODO: Once Docker is up and running, the xpos and ypos can be determined from this. 
		const output = ({'y_pos': 68.7, 'x_pos': 99.3});

		expect(scope.coordToXY(lat, long)).toBeCloseTo(output);
	});

	// Tests for Null Input in coordToXY (not for coordToXY; using as reminder for waypointNew)
	it('test with null input', () => {
		const lat = null;
		const long = null;
		const output = ({'y_pos': NaN, 'x_pos': NaN});
		//TODO: To check what the null value should return
		expect(scope.coordToXY(lat, long)).toEqual(output);
	});

	//Test that x_pos is greater than 0 with a negative value entered
	it('test xpos is positive with negative value', () => {
		const lat = 0;
		const long = -334;
		const output = ({'y_pos': 0, 'x_pos': 0});

		expect(scope.coordToXY(lat,long)).toBeGreaterThan(output);
	});

	//Test that x_pos is greater than 0 with a positive value entered
	it('test xpos is positive with positive value', () => {
		const lat = 0;
		const long = 10;
		const output = ({ 'y_pos': 0, 'x_pos': 0 });

		expect(scope.coordToXY(lat, long)).toBeGreaterThan(output);
	});

	//Test that y_pos is less than 0 with a negative value entered
	it('test ypos is negative with negative value', () => {
		const lat = -10;
		const long = 0;
		const testOut = scope.coordToXY(lat, long);

		expect(testOut['x']).toBeLessThan(0);
	});

	//Test that y_pos is less than 0 with a positive value entered
	it('test ypos is negative with positive value', () => {
		const lat = 10;
		const long = 0;
		const testOut = scope.coordToXY(lat, long);

		expect(testOut['x']).toBeLessThan(0);
	});

	//Test that when point A is more west than point B, x_pos for A is less than x_pos for B
	it('west point A.xpos less than east point B.xpos', () => {
		const latA = 0;
		const longA = 40;
		const latB = 0;
		const longB = 80;

		const testA = scope.coordToXY(latA, longA);
		const testB = scope.coordToXY(latB, longB);

		expect(testA['y']).toBeLessThan(testB['y']);
	});

	//Test that when point A is more north than point B, y_pos for A is less than y_pos for B
	it('north point A.xpos less than south point B.xpos', () => {
		const latA = 80;
		const longA = 0;
		const latB = 40;
		const longB = 0;

		const testA = scope.coordToXY(latA, longA);
		const testB = scope.coordToXY(latB, longB);

		expect(testA['x']).toBeLessThan(testB['x']);
	});

	//Tests the output with max latitude (90) and max long (180) inputs
	it('test with very max input', () => {
		const lat = 757124;
		const long = 999138;
		const output = ({ 'y_pos': 0, 'x_pos': 0 });

		expect(scope.coordToXY(lat, long)).toEqual(output);
	});
	
	//The minimum value (save for waypointNew?)
	
	it('test with very large negative input', () => {
		const lat = -90.000000;
		const long = -180.00000;
		const output = ({'y_pos': 0, 'x_pos': 0});

		expect(scope.coordToXY(lat, long)).toBeGreaterThan(output);
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

////Not testing this function for now because it's officially terrible to test
//describe('Testing addWaypointToMap', () => {
//	it('test null waypoint', () => {

//	});

//	it('test normal waypoint', () => {

//	});

//	it('test many waypoints', () => {

//	});

//	it('test very large waypoint', () => {

//	});

//	it('test improper waypoint', () => {

//	});

//	it('test many same waypoints', () => {

//	});

////	it('test many close waypoints', () => {

//	});

//	it('test many distant waypoints', () => {

//	});
//});

///*
// * This tests adding valid waypoints. I'm going to pretend the function call is waypointNew(lat, long) simply because
// * I'm not sure how to simulate the document.getElementById
//
//describe('Testing waypointNew', () => {

//	beforeEach(() => {
//		scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}]
//	});

//	const output1 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}];
//	const output2 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
//	const output3 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': -90, 'long': -180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
//	const output4 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 90, 'long': 180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
//	const output5 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 0, 'long': 0, 'x_pos': 0, 'y_pos': 0, 'index': 2 }];
//	//const output6 = ;

//	//Null input tests invalid and doesn't add a waypoint
//	it('test with null latitude', () => {
//		//Call with invalid input with null latitude;
//		waypointNew("", 1);

//		expect(scope.waypoints).toEqual(output1);
//	});

//	//Null input tests invalid and doesn't add a waypoint
//	it('test with null longitude', () => {
//		//Call with invalid input with null longitude;
//		waypointNew(1, "");

//		expect(scope.waypoints).toEqual(output1);
//	});

//	//Test with long that's too negative
//	it('test with too small input', () => {
//		//Call with invalid input with null longitude;
//		waypointNew(1, -2000);

//		expect(scope.waypoints).toEqual(output1);
//	});

//	//Test with long that's too large and positive
//	it('test with too large input', () => {
//		//Call with invalid input with null longitude;
//		waypointNew(1, 2000);

//		expect(scope.waypoints).toEqual(output1);
//	});

//	//Test with lat that's too negative
//	it('test with too small input', () => {
//		//Call with invalid input with null longitude;
//		waypointNew(-2000, 1);

//		expect(scope.waypoints).toEqual(output1);
//	});

//	//Test with lat that's too large and positive
//	it('test with too large input', () => {
//		//Call with invalid input with null longitude;
//		waypointNew(2000, 1);

//		expect(scope.waypoints).toEqual(output1);
//	})

//	//Ensures test with valid input adds point; TODO: ensure that output constants are correct
//	it('test with valid input', () => {
//		waypointNew(23, 23);

//		expect(scope.waypoints).toEqual(output2);
//	});

//	//Test with invalid input within a few valid entries
//	//only concerned about statement coverage for now... Brenna very tired
////	it('test with valid input, then invalid input, then valid input', () => {

//	});

//	//Tests valid input with most negative input; 
//	it('test with most negative input', () => {
//		waypointNew(-90, -180);

//		expect(scope.waypoints).toEqual(output3);
//	});

//	//Tests valid input with most positive input
//	it('test with most positive input', () => {
//		waypointNew(90, 180);

//		expect(scope.waypoints).toEqual(output4);
//	});

//	// Testing output for input of 0,0
//	it('test with inputs of 0', () => {
//		waypointNew(0, 0);

//		expect(coordToXY(lat, long)).toEqual(output5);
//	});

//	//Test with many valid inputs (many = 5?)

//	//Empties global waypoints variable
//	afterAll(() => {
//		scope.waypoints = [];
//	});
//});

//describe('Testing deleteLatestWaypoint', () => {  // test the deleteLatestWaypoint functionality
	
//	beforeEach(() => {  // setup initial waypoints array
//		scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2}];
//	})

//	const output1 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}];
//	const output2 = [];
//	const output3 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}];
//	const output4 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2}];

//	it('test with normal waypoint', () => {  // just test with removing 1 waypoint
//		deleteLatestWaypoint();
//		expect(scope.waypoints).toEqual(output1);
//	});

//	it('test with no waypoints', () => {
//		scope.waypoints = []  // empty array out since we need it empty for this test
//		deleteLatestWaypoint();
//		expect(scope.waypoints).toEqual(output2);
//	});

//	it('test delete then add then delete waypoint', () => {  // calls deleteLatestWaypoint twice and adds a waypoint between the calls
//		deleteLatestWaypoint();
//		scope.waypoints.push({'lat': 56, 'long': 43, 'x_pos': 7, 'y_pos': 8,'index': 2})
//		deleteLatestWaypoint();
//		expect(scope.waypoints).toEqual(output3);
//	});

//	it('test with many waypoints', () => {  // calls many times in a row with many waypoints in array
//		scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2},
//		{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 3}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 4},
//		{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 5}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 6},
//		{'lat': 37, 'long': 98, 'x_pos': 15, 'y_pos': 13, 'index': 7}]
//		deleteLatestWaypoint();
//		deleteLatestWaypoint();
//		deleteLatestWaypoint();
//		deleteLatestWaypoint();
//		deleteLatestWaypoint();
//		expect(scope.waypoints).toEqual(output4);
//	});

//	//Empties global waypoints variable
//	afterAll(() => {
//		scope.waypoints = [];
//	});
