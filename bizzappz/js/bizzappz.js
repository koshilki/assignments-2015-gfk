var bizzappz = function (range) {
    'use strict';
    var res = [], output, i;
    range = range || 100;

    for (i = 1; i < range + 1; i++) {
        output = '';
        if (i % 3 === 0) {
            output = 'Bizz';
        }
        if (i % 5 === 0) {
            output += 'Appz';
        }
        res.push(output || i);
    }
    return res;
};
