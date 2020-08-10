const path = require('path');

const make_dev_node = function(entryFile, outDir, mode = "production") {
    outFile = "node-" + path.basename(entryFile);
    return {
      target: 'node',
      entry: entryFile,
      output: {
        path: path.resolve(__dirname, "../" + outDir),
        filename: outFile,
        libraryTarget: "commonjs2"
      },
      mode: mode
    }
}

module.exports = [
    // base
    make_dev_node("./src/core/base/distributions.js", "bin/modules"),
    make_dev_node("./src/core/base/funprog.js", "bin/modules"),
    make_dev_node("./src/core/base/group_generic.js", "bin/modules"),
    make_dev_node("./src/core/base/math_functions.js", "bin/modules"),
    make_dev_node("./src/core/base/sets.js", "bin/modules"),
    make_dev_node("./src/core/base/stats.js", "bin/modules"),
    // for completeness
    make_dev_node("./src/core/base/utils.js", "bin/modules"),
];  
