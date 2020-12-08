// Unit testing file for the Cameras Controller
// May need to add some includes at the top, not sure what to add though


/* describe('testing homepage function', () => {  // Based on code written in the AINavigation tests
	it('should', async(() => {
		spyOn(home, 'homepage');

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click();

		fixture.whenStable().then(() => {
			expect(home.onEditButtonClick).toHaveBeenCalled();
		});
	}));
}); */

/* describe('testing addNotification', () => {

	beforeEach(() => {
		$scope.notifications = "none yet";
	});

	it('should send a notifcation', () => {
		var output1 = "none yetNew Notification Sent To Server\n";
		addNotification("New Notification Sent To Server");
		expect($scope.notifications).toEqual(output1);
	});
}); */

describe('testing removeLatestCamera function', () => {

	beforeEach(module('cameras'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
	}));

	it('should remove the latest camera', () => {  //
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.cameraIPs = [192.168.1.14, 192.168.1.23];  // fill in with 2 camera IPs of right format
		scope.removeLatestCamera();
		var output1C = [192.168.1.14];  // fill in with 1 camera IP of right format
		expect(scope.cameraIPs).toEqual(output1C);  //check for match
	});

	it('should do nothing with no cameras', () => {
		ctrl = $controller('CamerasController', { $scope: scope });
		scope.cameraIPs = [];
		scope.removeLatestCamera();
		var output2C = [];
		expect(scope.cameraIPs).toEqual(output2C);
	});

	afterAll(() => {  // empty cameraIPs at end of tests to avoid bugs
		scope.cameraIPs = [];
	});
});

describe('testing addIP function', () => {  // tests written to test the addIP function

	beforeEach(module('cameras'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
	}));

	it('should add an IP', () => {  // TODO finish this test when addIP is written
		ctrl = $controller('CamerasController', { $scope: scope });

	});

	it('should ignore bad input', () => {  // TODO finish this test when addIP is written
		ctrl = $controller('CamerasController', { $scope: scope });

	});

});

/* describe('testing eStop button', () => {  // tests written for the eStop button

	beforeEach(() => {
		$scope.notifications = "none yet";
	});

	it('should send a notification when called', () => {
		var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
		eStopButton();
		expect($scope.notifications).toEqual(output1);
	});
});  */
