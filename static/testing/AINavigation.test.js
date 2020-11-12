// Unit testing file for the AI Navigation controller

import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('testing homepage function', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ ],
			declarations: [ TestComponent ],
			providers: [ ]
		}).compileComponents().then()
	}))
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

describe('Testing fullWaypoint', () => {
	test('test full waypoint returns expected value', () => {
		
	});

	test('test full waypoint with negative numbers', () => {

	});

	test('test full waypoint with null input', () => {
		const input = null;

		const output = null;

		expect(fullWaypoint(input)).toEqual(output);
	});

	test('test full waypoint with large numbers', () => {

	});

	test('test full waypoint with very small numbers', () => {

	});

	test('Estop button called', () => {

	});

	test('Go button called', () => {

	});
});

describe('Testing lat2y', () => {
	test('test lat2y', () => {

	});
});

describe('Testing lat2x', () => {
	test('test lat2x', () => {
		
	});
});

describe('Testing coordToXY', () => {
	test('test with regular input', () => {

	});

	test('test with null input', () => {

	});

	test('test with negative input', () => {

	});

	test('test with very large input', () => {

	});

	test('test with very small input', () => {

	});

	test('test with same input', () => {

	});

	test('test with improper input', () => {

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

describe('Testing deleteLatestWaypoint', () => {
	test('test with normal waypoint', () => {

	});

	test('test with no waypoints', () => {

	});

	test('test delete then add then delete waypoint', () => {

	});

	test('test with many waypoints', () => {

	});
});
