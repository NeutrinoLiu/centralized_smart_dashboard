//trying new spec file for jasmine
import('../static/controllers/AINavigation.controller.js');

describe('AINavigationController', function () {

	beforeEach(angular.mock.module('AINavigation'));

	var $controller;

	beforeEach(angular.mock.inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	describe('ESTOP button', () => {  // tests the ESTOP button javscript function

		beforeEach(() => {
			var notify = scope.notifications;
			notify = "none yet";
		});

		const output1 = "none yetESTOP PRESSED! Rover is force restarting.\n"

		it('notification called', () => {  // checks that the notification popped up when the function called
			eStopButton();
			expect(notify).toEqual(output1);
		});
	});

	
});