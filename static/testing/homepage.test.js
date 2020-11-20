// Unit tests page for testing the homepage Controller

const homepageFunctions = require('../controllers/homepage.controller.js')

test('test ai-nav called', () => {
	const mockFunc = jest.fn()
	homepageFunctions.homepageController.aiNav = mockFunc;
	expect(mockFunc).toHaveBeenCalled()
})

test('test equipment servicing called', () => {

})

test('test Science called', () => {

})

test('test ERDM called', () => {

})

test('test Maintenance called', () => {

})
