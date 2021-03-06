import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, 'há 5 dias, fizemos algo', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('há 5 dias');

        expect(result.start).toBeDate(new Date(2012, 8-1, 5, 12));
    });

    testSingleCase(chrono, 'há 10 dias, fizemos algo', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('há 10 dias');

        expect(result.start).toBeDate(new Date(2012, 7-1, 31, 12));
    });


    testSingleCase(chrono, 'há 15 minutos', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('há 15 minutos');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(59);

        expect(result.start).toBeDate(new Date(2012,7,10,11,59));
    });

    testSingleCase(chrono, '   há 12 horas', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('há 12 horas');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        expect(result.start).toBeDate(new Date(2012,7,10,0,14));
    });
});


test("Test - Single Expression (Casual)", function() {

    testSingleCase(chrono, 'há 5 meses, fizemos algo', new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('há 5 meses');

        expect(result.start).toBeDate(new Date(2012, 3-1, 10, 12));
    });

    testSingleCase(chrono, 'há 5 anos, fizemos algo', new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2007);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('há 5 anos');

        expect(result.start).toBeDate(new Date(2007, 8-1, 10, 12));
    });


    testSingleCase(chrono, 'há uma semana, fizemos algo', new Date(2012, 8-1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe('há uma semana');

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });
});
