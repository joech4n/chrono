import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, '2 days later', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe('2 days later');

        expect(result.start.isCertain('day')).toBe(true);
        expect(result.start.isCertain('month')).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8-1, 12, 12));
    });

    testSingleCase(chrono, '5 minutes later', new Date(2012, 7, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(10);
        expect(result.start.get('minute')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('5 minutes later');

        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 10, 5));
    });

    testSingleCase(chrono, '3 week later', new Date(2012, 7-1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('3 week later');

        expect(result.start).toBeDate(new Date(2012, 7-1, 31, 12));
    });
});

test("Test - Single Expression (Strict)", function() {
    var text = "15 minute after";
    var results = chrono.strict.parse(text, new Date(2012,7,10,12,14));
    expect(results[0]).toBe(undefined);

    testUnexpectedResult(chrono.strict, 'a week ago, we did something', new Date(2012, 8-1, 3))

    testSingleCase(chrono, 'in 25 minutes', new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in 25 minutes');
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 5));
    });
});
