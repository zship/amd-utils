if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['../number/MIN_INT', '../number/MAX_INT', './rand'], function(MIN_INT, MAX_INT, rand){

    /**
     * Gets random integer inside range or snap to min/max values.
     * @version 0.6.0 (2012/04/24)
     */
    function randInt(min, max){
        min = min == null? MIN_INT : ~~min;
        max = max == null? MAX_INT : ~~max;
        // can't be max + 0.5 otherwise it will round up if `rand`
        // returns `max` causing it to overflow range.
        // -0.5 and + 0.49 are required to avoid bias caused by rounding
        return Math.round( rand(min - 0.5, max + 0.499999999999) );
    }

    return randInt;
});
