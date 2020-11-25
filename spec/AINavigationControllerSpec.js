
//trying new spec file for jasmine
import('../static/controllers/AINavigation.controller.js');

describe('AINavigationController', function() {

	var $controller, $rootScope;

	beforeEach(module('AINavigation'));


	beforeEach(inject(function (_$controller_, _$rootScope_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	describe('eStopButton', function() {  // tests the ESTOP button javscript function

		beforeEach(() => {
			var $scope = $rootScope.$new();
			var controller = $controller('AINavigationController', { $scope: $scope });
		});

		const output1 = "none yetESTOP PRESSED! Rover is force restarting.\n"

		it('notification called', () => {  // checks that the notification popped up when the function called
			eStopButton();
			expect($scope.notifications).toEqual(output1);
		});
	});

	
});