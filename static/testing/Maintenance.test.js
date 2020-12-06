// Unit testing file for the Maintenance Controller


describe('testing homepage function', () => {  // Based on code written in the AINavigation tests
	it('should', async(() => {
		spyOn(home, 'homepage');

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click();

		fixture.whenStable().then(() => {
			expect(home.onEditButtonClick).toHaveBeenCalled();
		});
	}));
});

describe('testing reset button', () => {  // tests written for the reset button

	it('should send a notification when pressed', () => {
		$scope.notifications = "none yet";
		var output1r = "none yetRESET PRESSED! Setting all motor direction values to zero.\n";
		resetButton();
		expect($scope.notifications).toEqual(output1r);
	});
});

describe('testing eStop button', () => {  // tests written for the eStop button

	beforeEach(() => {
		$scope.notifications = "none yet";
	});

	it('should send a notification when called', () => {
		var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
		eStopButton();
		expect($scope.notifications).toEqual(output1);
	});
});