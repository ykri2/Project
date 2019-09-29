const path = require('path')

/** used to run locate in project folder */
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat('../', ...args));
}

exports.root = root