// Unit testing file for the AI Navigation controller

import { TestBed, async, ComponentFixture } from '@angular/core/testing';

/*
This is a module just for grabbing the onClick in HTML
source: https://stackoverflow.com/questions/40093013/unit-testing-click-event-in-angular
This lets us instantiate the actual button
*/
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

describe('Testing fullWaypoint', () => {  // coordToXY is tied into this function.  Output for these tests may be wrong due to not understanding coordToXY
	// TODO Make a mock waypoints array to test with
	test('test full waypoint returns expected value', () => {  // TODO
		const input = ({'lat': 85, 'long': 47});
		const output = ({'lat': 85, 'long': 47, 'x_pos': 0, 'y_pos': 0, 'index': blah});  // TODO:  Fix this and mock the index

		expect(fullWaypoint(input)).toEqual(output);
	});

	test('test full waypoint with negative numbers', () => {  // TODO
		const input = ({'lat': -85.4132, 'long': -47.2151});
		const output = ({'lat': -85.4132, 'long': -47.2151, 'x_pos': 21.51, 'y_pos': 41.32, 'index': blah});

		expect(fullWaypoint(input)).toEqual(output);
	});

	test('test full waypoint with null input', () => {  // TODO
		const input = null;
		const output = null;

		expect(fullWaypoint(input)).toEqual(output);
	});

	test('test full waypoint with large numbers', () => {  // TODO
		const input = ({'lat': 135278129, 'long': 143187123});
		const output = ({'lat': 135278129, 'long': 143187123, 'x_pos': 0, 'y_pos': 0, 'index': blah});

		expect(fullWaypoint(input)).toEqual(output);
	});

	test('test full waypoint with very small positive numbers', () => {  // TODO
		const input = ({'lat': 0.000201313131, 'long': 0.00001312512});
		const output = ({'lat': 0.000201313131, 'long': 0.00001312512, 'x_pos': 0.0001312512, 'y_pos': 0.00201313131, 'index': blah});

		expect(fullWaypoint(input)).toEqual(output);
	});

	test('test full waypoint with very negative numbers', () => {  // TODO
		const input = ({'lat': -854142, 'long': -478787}):
		const output = ({'lat': -854142, 'long': -478787, 'x_pos': 0, 'y_pos': 0, 'index': blah});

		expect(fullWaypoint(input)).toEqual(output);
	})
});

describe('testing ESTOP button', () => {
	test('Estop button called', () => {

	});
});

describe('testing GO button', () => {
	test('Go button called', () => {

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

	// Testing output for input of 0,0
	test('test with inputs of 0', () => {
		const lat = 0;
		const long = 0;
		const output = ({'x_pos': 0, 'y_pos': 0});

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

	//Tests the output with max latitude (90) and max long (180) inputs
	/*test('test with very max input', () => {
		const lat = 757124;
		const long = 999138;
		const output = ({ 'x_pos': 0, 'y_pos': 0 });

		expect(coordToXY(lat, long)).toEqual(output);
	});*/
	/*
	The minmum value should be at the 
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

	/*test('test with improper input', () => {  // TODO Might be supposed to throw an error or something
		const lat = 'abc';
		const long = 'easy as one two';
		const output = ();
		const err = () => {
			throw new TypeError;
		};

		expect(coordToXY(lat, long)).toEqual(output);
	});*/
});

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

describe('Testing waypointNew', () => {
	test('test with invalid input', () => {

	});

	test('test with valid input', () => {

	});

	test('test with valid input, then invalid input, then valid input', () => {

	});

	test('test with slightly invalid input', () => {

	});

	test('test with very small input', () => {

	});

	test('test with very large input', () => {

	});
});

describe('Testing deleteLatestWaypoint', () => {  // test the deleteLatestWaypoint functionality
	// TODO:  Make a mock of the waypoints array to test with
	test('test with normal waypoint', () => {
		expect(deleteLatestWaypoint()).toHaveReturnedWith(0);
	});

	test('test with no waypoints', () => {
		expect(deleteLatestWaypoint()).toHaveReturnedWith(0);
	});

	test('test delete then add then delete waypoint', () => {  // calls deleteLatestWaypoint twice and adds a waypoint between the calls
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(1, 0);  // should return 0 each time
		
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(2, 0);  // should return 0 each time
	});

	test('test with many waypoints', () => {  // calls many times in a row with many waypoints in array
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(1, 0);  // should return 0 each time
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(2, 0);  // should return 0 each time
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(3, 0);  // should return 0 each time
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(4, 0);  // should return 0 each time
		expect(deleteLatestWaypoint()).toHaveNthReturnedWith(5, 0);  // should return 0 each time
	});
});
