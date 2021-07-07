const { GCode } = require('../dist/index');

test('G0 X100', () => {
	const gcode = new GCode();

	expect(gcode.G0({ X: 100 }).toString()).toBe('G0 X100');
});

test('G0 X100 Y200', () => {
	const gcode = new GCode();

	expect(gcode.G0({ X: 100, Y: 200 }).toString()).toBe('G0 X100 Y200');
});

test('G0 X100 Y200 ordered', () => {
	const gcode = new GCode();

	expect(gcode.G0({ Y: 200, X: 100 }).toString()).toBe('G0 X100 Y200');
});
