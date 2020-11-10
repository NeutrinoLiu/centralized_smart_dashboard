// Unit tests page for testing the homepage Controller

const homepageFunctions = require('../controllers/homepage.controller.js')

test('test ai-nav called', () => {
	const mockFunc = jest.fn()
	homepageFunctions.homepageController.aiNav = mockFunc;
	expect(mockFunc).toHaveBeenCalled()
})