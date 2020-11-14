// unit testing file for the erdm controller

//import { testbed, async, componentfixture } from '@angular/core/testing';
import { createtestapp } from 'angularjs-jest';
/*
this is a module just for grabbing the onclick in html
source: https://stackoverflow.com/questions/40093013/unit-testing-click-event-in-angular
this lets us instantiate the actual button
*/
/*
describe('', () => { //todo: adapt for the homepagebutton
	let fixture: componentfixture<home>; // home field is supposed to be the homepage instantiated
	let component: home;

	beforeeach(async(() => {
		testbed.configuretestingmodule({
			imports: [],
			declarations: [home],
			providers: []
		}).compilecomponents().then(() => {
			fixture = testbed.createcomponent(home);
			component = fixture.componentinstance;
		});
	}));
});
*/
describe('testing homepage function', () => { //todo check for onclick functions

	// every instance of home refers to the html homepage, 'homepage' means for the controller method
	it('should', async(() => {
		spyon(home, 'homepage');

		let button = fixture.debugelement.nativeelement.queryselector('button');
		button.click();

		fixture.whenstable().then(() => {
			expect(home.oneditbuttonclick).tohavebeencalled();
		});
	}));

	// tests if the controller gets called when homepage is hit	
	/*
	when button for homepage is clicked, then the controller function should be called
	*/
	test('test homepage called', () => {

	});

	// testing that the path updates when homepage runs
	test('testing that path updates', () => {

	});
});

describe('testing init function', () => {
	test('test init called', () => {

	});
});

//this test ensures that each field of waypoint is not null
describe('testing fullwaypoint', () => {
	//gives a waypoint with only latitude and longitude to the function
	beforeeach(() => {
		testwaypoint = { 'lat': 10, 'long': 20 };
	});

	//tests that lat is not null
	test('testwaypoint[lat] not null', () => {
		fullwaypoint(testwaypoint);

		expect(testwaypoint['lat']).not.tobenull();
	});

	//tests that long is not null
	test('testwaypoint[long] not null', () => {
		fullwaypoint(testwaypoint);

		expect(testwaypoint['long']).not.tobenull();
	});

	//tests that index is not null
	test('testwaypoint[index] not null', () => {
		fullwaypoint(testwaypoint);

		expect(testwaypoint['index']).not.tobenull();
	});

	//tests that x_pos is not null
	test('testwaypoint[x_pos] not null', () => {
		fullwaypoint(testwaypoint);

		expect(testwaypoint['x_pos']).not.tobenull();
	});

	//tests that y_pos is not null
	test('testwaypoint[y_pos] not null', () => {
		fullwaypoint(testwaypoint);

		expect(testwaypoint['y_pos']).not.tobenull();
	})

});

describe('testing addnotification', () => {  // testing the addnotification function

	beforeeach(() => {
		$scope.notifications = "none yet";
	});

	const output1 = "none yetnew notification sent to server\n";
	const output2 = "none yethello\nthis\nis a new\nnotification\nthat we\nsent!\n";
	const output3 = "none yet\n";

	test('notifications are as expected after call', () => {  //test after 1 call that notifications matches
		addnotification("new notification sent to server");
		expect($scope.notifications).toequal(output1);
	});

	test('notifications are as expected after several calls', () => {  //test after several calls that notifications matches
		addnotification("hello");
		addnotification("this");
		addnotification("is a new");
		addnotification("notification");
		addnotification("that we");
		addnotification("sent!");
		expect($scope.notifications).toequal(output2);
	});

	test('notifications are as expected after empty string', () => {  //test after 1 call that notifications matches
		addnotification("");
		expect($scope.notifications).toequal(output3);
	});

	//defaults global notifications variable
	afterall(() => {
		$scope.notifications = "none yet";
	});
});

//tests the estop button; checks for the appropriate notification
describe('testing estop button', () => {

	beforeeach(() => {
		$scope.notifications = "none yet";
	});

	const output1 = "none yetestop pressed! rover is force restarting.\n"

	test('estop button notification called', () => {  // checks that the notification popped up when the function called
		estopbutton();
		expect($scope.notifications).toequal(output1);
	});
});

/*
this below is the unit testing just for coordtoxy. 
*/
describe('testing coordtoxy', () => {  // tests for testing coordtoxy.  expected output for these may be wrong
	//tests math completed in coordtoxy
	test('test with regular input', () => {
		const lat = 53.687;
		const long = 37.993;
		//todo: once docker is up and running, the xpos and ypos can be determined from this. 
		const output = ({ 'x_pos': 68.7, 'y_pos': 99.3 });

		expect(coordtoxy(lat, long)).toequal(output);
	});

	// tests for null input in coordtoxy (not for coordtoxy; using as reminder for waypointnew)
	test('test with null input', () => {
		const lat = null;
		const long = null;
		const output = ({ 'x_pos': null, 'y_pos': null });
		//todo: to check what the null value should return
		expect(coordtoxy(lat, long)).toequal(output);
	});

	//test that x_pos is greater than 0 with a negative value entered
	test('test xpos is positive with negative value', () => {
		const lat = 0;
		const long = -334;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordtoxy(lat, long)).tobegreaterthan(output);
	});

	//test that x_pos is greater than 0 with a positive value entered
	test('test xpos is positive with positive value', () => {
		const lat = 0;
		const long = 10;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordtoxy(lat, long)).tobegreaterthan();
	})

	//test that y_pos is less than 0 with a negative value entered
	test('test ypos is negative with negative value', () => {
		const lat = -10;
		const long = 0;
		const testout = coordtoxy(lat, long);

		expect(testout['y']).tobelessthan(0);
	})

	//test that y_pos is less than 0 with a positive value entered
	test('test ypos is negative with positive value', () => {
		const lat = 10;
		const long = 0;
		const testout = coordtoxy(lat, long);

		expect(testout['y']).tobelessthan(0);
	})

	//test that when point a is more west than point b, x_pos for a is less than x_pos for b
	test('west point a.xpos less than east point b.xpos', () => {
		const lata = 0;
		const longa = 40;
		const latb = 0;
		const longb = 80;

		const testa = coordtoxy(lata, longa);
		const testb = coordtoxy(latb, longb);

		expect(testa['x']).tobelessthan(testb['x']);
	})

	//test that when point a is more north than point b, y_pos for a is less than y_pos for b
	test('north point a.xpos less than south point b.xpos', () => {
		const lata = 80;
		const longa = 0;
		const latb = 40;
		const longb = 0;

		const testa = coordtoxy(lata, longa);
		const testb = coordtoxy(latb, longb);

		expect(testa['y']).tobelessthan(testb['y']);
	})

	//tests the output with max latitude (90) and max long (180) inputs
	/*test('test with very max input', () => {
		const lat = 757124;
		const long = 999138;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordtoxy(lat, long)).toequal(output);
	});*/
	/*
	the minimum value (save for waypointnew?)
	*/
	test('test with very large negative input', () => {
		const lat = -90.000000;
		const long = -180.00000;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordtoxy(lat, long)).tobegreaterthan(output);
	});

	/*
	making sure that identical waypoints will be added to the same x and y_pos
	done
	*/
	test('test with same input', () => {
		const lat = 55;
		const long = 55;
		const lat1 = 55;
		const long2 = 55;

		expect(coordtoxy(lat, long)).toequal(coordtoxy(lat1, long1));
	});

});

//not testing this function for now because it's officially terrible to test
describe('testing addwaypointtomap', () => {
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
 * this tests adding valid waypoints. i'm going to pretend the function call is waypointnew(lat, long) simply because
 * i'm not sure how to simulate the document.getelementbyid
 */
describe('testing waypointnew', () => {

	beforeeach(() => {
		$scope.waypoints = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }]
	});

	const output1 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }];
	const output2 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	const output3 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': -90, 'long': -180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	const output4 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 90, 'long': 180, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	const output5 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 0, 'long': 0, 'x_pos': 0, 'y_pos': 0, 'index': 2 }];
	

	//null input tests invalid and doesn't add a waypoint
	test('test with null latitude', () => {
		//call with invalid input with null latitude;
		waypointnew("", 1);

		expect($scope.waypoints).toequal(output1);
	});

	//null input tests invalid and doesn't add a waypoint
	test('test with null longitude', () => {
		//call with invalid input with null longitude;
		waypointnew(1, "");

		expect($scope.waypoints).toequal(output1);
	});

	//ensures test with valid input adds point; todo: ensure that output constants are correct
	test('test with valid input', () => {
		waypointnew(23, 23);

		expect($scope.waypoints).toequal(output2);
	});

	//test with long that's too negative
	test('test with too small input', () => {
		//call with invalid input with null longitude;
		waypointnew(1, -2000);

		expect($scope.waypoints).toequal(output1);
	});

	//test with long that's too large and positive
	test('test with too large input', () => {
		//call with invalid input with null longitude;
		waypointnew(1, 2000);

		expect($scope.waypoints).toequal(output1);
	});

	//test with lat that's too negative
	test('test with too small input', () => {
		//call with invalid input with null longitude;
		waypointnew(-2000, 1);

		expect($scope.waypoints).toequal(output1);
	});

	//test with lat that's too large and positive
	test('test with too large input', () => {
		//call with invalid input with null longitude;
		waypointnew(2000, 1);

		expect($scope.waypoints).toequal(output1);
	})


	//test with invalid input within a few valid entries
	//only concerned about statement coverage for now... brenna very tired
	test('test with valid input, then invalid input, then valid input', () => {

	});

	//tests valid input with most negative input; 
	test('test with most negative input', () => {
		waypointnew(-90, -180);

		expect($scope.waypoints).toequal(output3);
	});

	//tests valid input with most positive input
	test('test with most positive input', () => {
		waypointnew(90, 180);

		expect($scope.waypoints).toequal(output4);
	});

	// testing output for input of 0,0
	test('test with inputs of 0', () => {
		waypointnew(0, 0);

		expect(coordtoxy(lat, long)).toequal(output5);
	});

	//test with many valid inputs (many = 5?)

	//empties global waypoints variable
	afterall(() => {
		$scope.waypoints = [];
	});
});

describe('testing deletelatestwaypoint', () => {  // test the deletelatestwaypoint functionality

	beforeeach(() => {  // setup initial waypoints array
		$scope.waypoints = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];
	})

	const output1 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }];
	const output2 = [];
	const output3 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }];
	const output4 = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5, 'index': 2 }];

	test('test with normal waypoint', () => {  // just test with removing 1 waypoint
		deletelatestwaypoint();
		expect($scope.waypoints).toequal(output1);
	});

	test('test with no waypoints', () => {
		$scope.waypoints = []  // empty array out since we need it empty for this test
		deletelatestwaypoint();
		expect($scope.waypoints).toequal(output2);
	});

	test('test delete then add then delete waypoint', () => {  // calls deletelatestwaypoint twice and adds a waypoint between the calls
		deletelatestwaypoint();
		$scope.waypoints.push({ 'lat': 56, 'long': 43, 'x_pos': 7, 'y_pos': 8, 'index': 2 })
		deletelatestwaypoint();
		expect($scope.waypoints).toequal(output3);
	});

	test('test with many waypoints', () => {  // calls many times in a row with many waypoints in array
		$scope.waypoints = [{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 1 }, { 'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5, 'index': 2 },
		{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 3 }, { 'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5, 'index': 4 },
		{ 'lat': 23, 'long': 23, 'x_pos': 5, 'y_pos': 5, 'index': 5 }, { 'lat': 34, 'long': 34, 'x_pos': 5, 'y_pos': 5, 'index': 6 },
		{ 'lat': 37, 'long': 98, 'x_pos': 15, 'y_pos': 13, 'index': 7 }]
		deletelatestwaypoint();
		deletelatestwaypoint();
		deletelatestwaypoint();
		deletelatestwaypoint();
		deletelatestwaypoint();
		expect($scope.waypoints).toequal(output4);
	});

	//empties global waypoints variable
	afterall(() => {
		$scope.waypoints = [];
	});
});// unit testing file for the erdm controller
