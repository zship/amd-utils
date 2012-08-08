if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['./trim'], function(trim){
    /**
    * Limit number of chars.
    * @version 0.3.0 (2011/10/31)
    */
    function truncate(str, maxChars, append, onlyFullWords){
        append = append || '...';
        maxChars = onlyFullWords? maxChars + 1 : maxChars;

        str = trim(str);
        if(str.length <= maxChars){
            return str;
        }
        str = str.substr(0, maxChars - append.length);
        //crop at last space or remove trailing whitespace
        str = onlyFullWords? str.substr(0, str.lastIndexOf(' ')) : trim(str);
        return str + append;
    }
    return truncate;
});
