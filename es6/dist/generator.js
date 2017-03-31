"use strict";

var _marked = [a].map(regeneratorRuntime.mark);

function a() {
    return regeneratorRuntime.wrap(function a$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    _context.next = 4;
                    return 2;

                case 4:
                    _context.next = 6;
                    return 3;

                case 6:
                    _context.next = 8;
                    return 4;

                case 8:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}
var g = a();
console.log(g);
console.log(g.next());
console.log(g.next());