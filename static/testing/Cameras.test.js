// Unit testing file for the Cameras Controller

describe('testing homepage function', () => {
	it('should', async(() => {
		spyOn(home, 'homepage');

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click();

		fixture.whenStable().then(() => {
			expect(home.onEditButtonClick).toHaveBeenCalled();
		});
	}));
});

describe('testing remove latest camera function', () => {
	it('should remove the latest camera', () => {
		
	});

	it('should do nothing with no cameras', () => {

	});
});

describe('testing addIP function', () => {

});

describe('testing eStop button', () => {

});

describe('testing showVideo function', () => {

});