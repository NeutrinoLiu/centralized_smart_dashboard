
//trying new spec file for jasmine
//import('../static/controllers/AINavigation.controller.js');

describe('AINavigationController', function() {

	beforeEach(module('AINavigation', ['panzoom', 'panzoomwidget']));

	var $controller, $rootScope;

	beforeEach(inject(function AINavigationController(_$controller_, _$rootScope_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		//controller = $AIcontroller('AINavigationController');
		//$rootScope = _$rootScope_;
	}));

	describe('$scope.eStopButton', function() {  // tests the ESTOP button javscript function
		var $scope, controller;
		const output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";

		beforeEach(function () {
			$scope = {};
			//controller = $controller('AINavigationController', { $scope: $scope });
		});

		it('notification called', () => {  // checks that the notification popped up when the function called
			$scope.eStopButton;
			expect($scope.notifications).toEqual(output1);
		});
	});

	
});