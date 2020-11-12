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

describe('Testing coordToXY', () => {  // tests for testing coordToXY.  Expected output for these may be wrong
	test('test with regular input', () => {
		const lat = 53.687;
		const long = 37.993;
		const output = ({'x_pos': 68.7, 'y_pos': 99.3});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	test('test with null input', () => {
		const lat = null;
		const long = null;
		const output = ({'x_pos': null, 'y_pos': null});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	test('test with negative input', () => {
		const lat = -72.12;
		const long = -89.23;
		const output = ({'x_pos': 12, 'y_pos': 23});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	test('test with very large input', () => {
		const lat = 757124;
		const long = 999138;
		const output = ({'x_pos': 0, 'y_pos': 0});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	test('test with very small positive input', () => {
		const lat = 0.000000123;
		const long = 0.000000516;
		const output = ({'x_pos': 0.00000123, 'y_pos': 0.00000516});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	test('test with same input', () => {
		const lat = 55;
		const long = 55;
		const output = ({'x_pos': 0, 'y_pos': 0});

		expect(coordToXY(lat, long)).toEqual(output);
	});

	test('test with improper input', () => {  // TODO Might be supposed to throw an error or something
		const lat = 'abc';
		const long = 'easy as one two';
		const output = ();
		const err = () => {
			throw new TypeError;
		};

		expect(coordToXY(lat, long)).toEqual(output);
	});
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
