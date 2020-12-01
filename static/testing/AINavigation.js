// Unit testing file for the AI Navigation controller

 //import { TestBed, async, ComponentFixture } from '@angular/core/testing';
 //import { createTestApp } from 'angularjs-jest';
/*
This is a module just for grabbing the onClick in HTML
source: https://stackoverflow.com/questions/40093013/unit-testing-click-event-in-angular
This lets us instantiate the actual button
*/
/*
describe('', () => { //TODO: Adapt for the homepagebutton
  let fixture: ComponentFixture<home>; // home field is supposed to be the homepage instantiated
  let component: home;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ home ],
      providers: [  ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(home);
      component = fixture.componentInstance;
    });
  }));
});
*/

//FOR REFERENCE ONLY
const AINavigation = require('../static/controllers/AINavigation.controller.js');

	describe('AINavigation', ($scope, $window, $http, PanZoomService) => {
		describe('testing homepage function', () => { //TODO Check for onClick Functions

			// Every instance of home refers to the HTML Homepage, 'homepage' means for the controller method
			it('should', async(() => {
				spyOn(home, 'homepage');

				let button = fixture.debugElement.nativeElement.querySelector('button');
				button.click();

				fixture.whenStable().then(() => {
					expect(home.onEditButtonClick).toHaveBeenCalled();
				});
			}));

			// tests if the controller gets called when homepage is hit	
			/*
			When button for homepage is clicked, then the controller function should be called
			*/
			test('test homepage called', () => {

			});

			// Testing that the path updates when homepage runs
			test('testing that path updates', () => {

			});
		});
	});


describe('testing homepage function', () => { //TODO Check for onClick Functions
	
	// Every instance of home refers to the HTML Homepage, 'homepage' means for the controller method
	it('should', async(() => {
		spyOn(home, 'homepage');

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click();

		fixture.whenStable().then(() => {
			expect(home.onEditButtonClick).toHaveBeenCalled();
		});
	}));

	// tests if the controller gets called when homepage is hit	
	/*
	When button for homepage is clicked, then the controller function should be called
	*/
	test('test homepage called', () => {
		
	});

	// Testing that the path updates when homepage runs
	test('testing that path updates', () => {

	});
});

describe('testing init function', () => {
	test('test init called', () => {

	});
});

//This test ensures that each field of waypoint is not null
describe('Testing fullWaypoint', () => {
	//Gives a waypoint with only latitude and longitude to the function
	beforeEach(() => {
		testWaypoint = { 'lat': 10, 'long': 20 };
	});

	//Tests that lat is not null
	test('testWaypoint[lat] not null', () => {
		fullWaypoint(testWaypoint);

		expect(testWaypoint['lat']).not.toBeNull();
	});

	//Tests that long is not null
	test('testWaypoint[long] not null', () => {
		fullWaypoint(testWaypoint);

		expect(testWaypoint['long']).not.toBeNull();
	});

	//Tests that index is not null
	test('testWaypoint[index] not null', () => {
		fullWaypoint(testWaypoint);

		expect(testWaypoint['index']).not.toBeNull();
	});

	//Tests that x_pos is not null
	test('testWaypoint[x_pos] not null', () => {
		fullWaypoint(testWaypoint);

		expect(testWaypoint['x_pos']).not.toBeNull();
	});

	//Tests that y_pos is not null
	test('testWaypoint[y_pos] not null', () => {
		fullWaypoint(testWaypoint);

		expect(testWaypoint['y_pos']).not.toBeNull();
	})

});

describe('testing addNotification', () => {  // testing the addNotification function
	
	beforeEach(() => {
		$scope.notifications = "none yet";
	});

	const output1 = "none yetNew Notification Sent To Server\n";
	const output2 = "none yetHello\nThis\nIS A New\nNotification\nThat We\nSent!\n";
	const output3 = "none yet\n";

	test('Notifications are as expected after call', () => {  //test after 1 call that notifications matches
		addNotification("New Notification Sent To Server");
		expect($scope.notifications).toEqual(output1);
	});

	test('Notifications are as expected after several calls', () => {  //test after several calls that notifications matches
		addNotification("Hello");
		addNotification("This");
		addNotification("Is A New");
		addNotification("Notification");
		addNotification("That We");
		addNotification("Sent!");
		expect($scope.notifications).toEqual(output2);
	});

	test('Notifications are as expected after empty string', () => {  //test after 1 call that notifications matches
		addNotification("");
		expect($scope.notifications).toEqual(output3);
	});

	//Defaults global notifications variable
	afterAll(() => {
		$scope.notifications = "none yet";
	});
});

describe('testing ESTOP button', () => {  // tests the ESTOP button javscript function

	beforeEach(() => {
		$scope.notifications = "none yet";
	});

	const output1 = "none yetESTOP PRESSED! Rover is force restarting.\n"

	test('Estop button notification called', () => {  // checks that the notification popped up when the function called
		eStopButton();
		expect($scope.notifications).toEqual(output1);
	});
});

describe('testing GO button', () => {  // tests the GO button javascript function

	beforeEach(() => {
		$scope.notifications = "none yet";
	});

	const output1 = "none yetGO button pressed! Rover is moving.\n"

	test('Go button notification called', () => {  // checks that the notification popped up when the function called
		goButton();
		expect($scope.notifications).toEqual(output1);
	});
});

/*
This below is the unit testing just for coordToXY. 
*/
describe('Testing coordToXY', () => {  // tests for testing coordToXY.  Expected output for these may be wrong
	//Tests math completed in coordToXY
	test('test with regular input', () => {
		const lat = 53.687;
		const long = 37.993;
		//TODO: Once Docker is up and running, the xpos and ypos can be determined from this. 
		const output = ({'x_pos': 68.7, 'y_pos': 99.3});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	// Tests for Null Input in coordToXY (not for coordToXY; using as reminder for waypointNew)
	test('test with null input', () => {
		const lat = null;
		const long = null;
		const output = ({'x_pos': null, 'y_pos': null});
		//TODO: To check what the null value should return
		expect(coordToXY(lat, long)).toEqual(output);
	});

	//Test that x_pos is greater than 0 with a negative value entered
	test('test xpos is positive with negative value', () => {
		const lat = 0;
		const long = -334;
		const output = ({'x_pos': 0, 'y_pos': 0});

		expect(coordToXY(lat,long)).toBeGreaterThan(output);
	});

	//Test that x_pos is greater than 0 with a positive value entered
	test('test xpos is positive with positive value', () => {
		const lat = 0;
		const long = 10;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordToXY(lat, long)).toBeGreaterThan();
	})

	//Test that y_pos is less than 0 with a negative value entered
	test('test ypos is negative with negative value', () => {
		const lat = -10;
		const long = 0;
		const testOut = coordToXY(lat, long);

		expect(testOut['y']).toBeLessThan(0);
	})

	//Test that y_pos is less than 0 with a positive value entered
	test('test ypos is negative with positive value', () => {
		const lat = 10;
		const long = 0;
		const testOut = coordToXY(lat, long);

		expect(testOut['y']).toBeLessThan(0);
	})

	//Test that when point A is more west than point B, x_pos for A is less than x_pos for B
	test('west point A.xpos less than east point B.xpos', () => {
		const latA = 0;
		const longA = 40;
		const latB = 0;
		const longB = 80;

		const testA = coordToXY(latA, longA);
		const testB = coordToXY(latB, longB);

		expect(testA['x']).toBeLessThan(testB['x']);
	})

	//Test that when point A is more north than point B, y_pos for A is less than y_pos for B
	test('north point A.xpos less than south point B.xpos', () => {
		const latA = 80;
		const longA = 0;
		const latB = 40;
		const longB = 0;

		const testA = coordToXY(latA, longA);
		const testB = coordToXY(latB, longB);

		expect(testA['y']).toBeLessThan(testB['y']);
	})

	//Tests the output with max latitude (90) and max long (180) inputs
	/*test('test with very max input', () => {
		const lat = 757124;
		const long = 999138;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordToXY(lat, long)).toEqual(output);
	});*/
	/*
	The minimum value (save for waypointNew?)
	*/
	test('test with very large negative input', () => {
		const lat = -90.000000;
		const long = -180.00000;
		const output = ({'x_pos': 0, 'y_pos': 0});

		expect(coordToXY(lat, long)).toBeGreaterThan(output);
	});

	/*
	Making sure that identical waypoints will be added to the same x and y_pos
	DONE
	*/
	test('test with same input', () => {
		const lat = 55;
		const long = 55;
		const lat1 = 55;
		const long2 = 55;

		expect(coordToXY(lat, long)).toEqual(coordToXY(lat1,long1));
	});

});

//Not testing this function for now because it's officially terrible to test
describe('Testing addWaypointToMap', () => {
	test('test null waypoint', () => {

	});

	test('test normal waypoint', () => {

	});

	test('test many waypoints', () => {

	});

	test('test very large waypoint', () => {

	});

	test('test improper waypoint', () => {

	});

	test('test many same waypoints', () => {

	});

	test('test many close waypoints', () => {

	});

	test('test many distant waypoints', () => {

	});
});

/*
 * This tests adding valid waypoints. I'm going to pretend the function call is waypointNew(lat, long) simply because
 * I'm not sure how to simulate the document.getElementById
 */
describe('Testing waypointNew', () => {

	beforeEach(() => {
		$scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}]
	});

	const output1 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}];
	const output2 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	const output3 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': -90, 'long': -180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	const output4 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 90, 'long': 180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	const output5 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 0, 'long': 0, 'x_pos': 0, 'y_pos': 0, 'index': 2 }];
	//const output6 = ;

	//Null input tests invalid and doesn't add a waypoint
	test('test with null latitude', () => {
		//Call with invalid input with null latitude;
		waypointNew("", 1);

		expect($scope.waypoints).toEqual(output1);
	});

	//Null input tests invalid and doesn't add a waypoint
	test('test with null longitude', () => {
		//Call with invalid input with null longitude;
		waypointNew(1, "");

		expect($scope.waypoints).toEqual(output1);
	});

	//Test with long that's too negative
	test('test with too small input', () => {
		//Call with invalid input with null longitude;
		waypointNew(1, -2000);

		expect($scope.waypoints).toEqual(output1);
	});

	//Test with long that's too large and positive
	test('test with too large input', () => {
		//Call with invalid input with null longitude;
		waypointNew(1, 2000);

		expect($scope.waypoints).toEqual(output1);
	});

	//Test with lat that's too negative
	test('test with too small input', () => {
		//Call with invalid input with null longitude;
		waypointNew(-2000, 1);

		expect($scope.waypoints).toEqual(output1);
	});

	//Test with lat that's too large and positive
	test('test with too large input', () => {
		//Call with invalid input with null longitude;
		waypointNew(2000, 1);

		expect($scope.waypoints).toEqual(output1);
	})

	//Ensures test with valid input adds point; TODO: ensure that output constants are correct
	test('test with valid input', () => {
		waypointNew(23, 23);

		expect($scope.waypoints).toEqual(output2);
	});

	//Test with invalid input within a few valid entries
	//only concerned about statement coverage for now... Brenna very tired
	test('test with valid input, then invalid input, then valid input', () => {

	});

	//Tests valid input with most negative input; 
	test('test with most negative input', () => {
		waypointNew(-90, -180);

		expect($scope.waypoints).toEqual(output3);
	});

	//Tests valid input with most positive input
	test('test with most positive input', () => {
		waypointNew(90, 180);

		expect($scope.waypoints).toEqual(output4);
	});

	// Testing output for input of 0,0
	test('test with inputs of 0', () => {
		waypointNew(0, 0);

		expect(coordToXY(lat, long)).toEqual(output5);
	});

	//Test with many valid inputs (many = 5?)

	//Empties global waypoints variable
	afterAll(() => {
		$scope.waypoints = [];
	});
});

describe('Testing deleteLatestWaypoint', () => {  // test the deleteLatestWaypoint functionality
	
	beforeEach(() => {  // setup initial waypoints array
		$scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2}];
	})

	const output1 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}];
	const output2 = [];
	const output3 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}];
	const output4 = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2}];

	test('test with normal waypoint', () => {  // just test with removing 1 waypoint
		deleteLatestWaypoint();
		expect($scope.waypoints).toEqual(output1);
	});

	test('test with no waypoints', () => {
		$scope.waypoints = []  // empty array out since we need it empty for this test
		deleteLatestWaypoint();
		expect($scope.waypoints).toEqual(output2);
	});

	test('test delete then add then delete waypoint', () => {  // calls deleteLatestWaypoint twice and adds a waypoint between the calls
		deleteLatestWaypoint();
		$scope.waypoints.push({'lat': 56, 'long': 43, 'x_pos': 7, 'y_pos': 8,'index': 2})
		deleteLatestWaypoint();
		expect($scope.waypoints).toEqual(output3);
	});

	test('test with many waypoints', () => {  // calls many times in a row with many waypoints in array
		$scope.waypoints = [{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 1}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 2},
		{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 3}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 4},
		{'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5,'index': 5}, {'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5,'index': 6},
		{'lat': 37, 'long': 98, 'x_pos': 15, 'y_pos': 13, 'index': 7}]
		deleteLatestWaypoint();
		deleteLatestWaypoint();
		deleteLatestWaypoint();
		deleteLatestWaypoint();
		deleteLatestWaypoint();
		expect($scope.waypoints).toEqual(output4);
	});

	//Empties global waypoints variable
	afterAll(() => {
		$scope.waypoints = [];
	});
});
