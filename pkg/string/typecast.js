if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function () {

    var UNDEF;

    /**
     * Parses string and convert it into a native value.
     * @version 0.2.0 (2011/10/30)
     */
    function typecast(val) {
        var r;
        if ( val === null || val === 'null' ) {
            r = null;
        } else if ( val === 'true' ) {
            r = true;
        } else if ( val === 'false' ) {
            r = false;
        } else if ( val === UNDEF || val === 'undefined' ) {
            r = UNDEF;
        } else if ( val === '' || isNaN(val) ) {
            //isNaN('') returns false
            r = val;
        } else {
            //parseFloat(null || '') returns NaN
            r = parseFloat(val);
        }
        return r;
    }

    return typecast;
});
