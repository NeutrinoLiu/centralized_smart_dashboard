describe('example test', function() {
	it('should be true', function() {
		expect('foo').toBe('foo');
	});
});

describe('window', function() {
  it('has a module function', function() {
    expect(typeof module).toBe("function");
  }); // passes
  it('has an inject function', function() {
    expect(typeof inject).toBe("function");
  }); // passes
});
