if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./indexOf'], function(indexOf){

    /**
     * Remove a single item from the array.
     * (it won't remove duplicates, just a single item)
     * @version 0.1.1 (2012/03/13)
     */
    function remove(arr, item){
        var idx = indexOf(arr, item);
        if (idx !== -1) arr.splice(idx, 1);
    }

    return remove;
});
