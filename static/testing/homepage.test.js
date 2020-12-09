// Unit tests page for testing the homepage Controller
//import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('testing homepage controller', () => {

	beforeEach(module('homepage'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
		ctrl = $controller('homepageController', { $scope: scope });
	}));

	it('test ai-nav called', () => {
		
	});

	it('test Cameras called', () => {

	});

	it('test ERDM called', () => {

	});

	it('test Maintenance called', () => {

	});
});
