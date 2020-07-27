const path = require('path');

// entryFile must be a .js file
const makeNodeConfig = function(entryFile, mode) {
  outFile = "node-" + path.basename(entryFile);
  return {
    target: 'node',
    entry: entryFile,
    output: {
      path: path.resolve(__dirname, 'bin/dist'),
      filename: outFile,
      libraryTarget: "commonjs2",
      libraryExport: "default"
    },
    mode: mode
  }
}

const makeWebConfig = function(entryFile, mode) {
  outFile = "browser-" + path.basename(entryFile);
  return {
    target: 'web', 
    entry: entryFile,
    output: {
      path: path.resolve(__dirname, 'bin/dist'),
      filename: outFile,
      libraryExport: "default",
      library: 'R'  // library export name
    },
    mode: mode
  }
}

// Main
const mode = "production";
const RJS_NODE = makeNodeConfig('./src/R.js', mode);
// module.exports = [RJS_NODE];

const RJS_WEB = makeWebConfig('./src/R.js', mode);
module.exports = [ RJS_NODE, RJS_WEB ];
