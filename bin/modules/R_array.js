"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _R_base = _interopRequireDefault(require("./R_base.js"));

var _mathjs = require("mathjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var math = (0, _mathjs.create)({
  typedDependencies: _mathjs.typedDependencies,
  transposeDependencies: _mathjs.transposeDependencies,
  reshapeDependencies: _mathjs.reshapeDependencies,
  subsetDependencies: _mathjs.subsetDependencies,
  indexDependencies: _mathjs.indexDependencies,
  prodDependencies: _mathjs.prodDependencies,
  rangeDependencies: _mathjs.rangeDependencies,
  sizeDependencies: _mathjs.sizeDependencies
}, {
  matrix: 'Array'
}); // Combine values into a vector

function c() {
  var res = [];

  var g = function g(x) {
    res.push(x);
  };

  _R_base["default"].walk(Array.prototype.slice.call(arguments), g);

  return res;
} // Matrices


var matrix2 = math.typed('matrix2', {
  'null | undefined | number | string | boolean | Array, number, number': function nullUndefinedNumberStringBooleanArrayNumberNumber(x, nrow, ncol) {
    return matrix2(x, nrow, ncol, false);
  },
  'null | undefined | number | string | boolean, number, number, boolean': function nullUndefinedNumberStringBooleanNumberNumberBoolean(x, nrow, ncol) {
    var byrow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var y = Array(nrow * ncol).fill(x);
    return matrix2(y, nrow, ncol, byrow);
  },
  'Array, number, number, boolean': function ArrayNumberNumberBoolean(x, nrow, ncol) {
    var byrow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return byrow ? math.reshape(x, [nrow, ncol]) : math.transpose(math.reshape(x, [ncol, nrow]));
  }
}); // Array

var array = math.typed('array', {
  'number, Array': function numberArray(x, dims) {
    var y = Array(math.prod(dims)).fill(x);
    return array(y, dims);
  },
  'Array, Array': function ArrayArray(x, dims) {
    return math.reshape(x, dims);
  }
});
/* Extractor
The array class (including vectors and matrices) supports 
only the `[` extractor, but not the `[[` extractor.
The extractor takes any number of arguments, and each of them 
can be a number or a (R-)vector. 
*/

var arrayExtract = math.typed('extract', {
  'Array, ...number | Array': function ArrayNumberArray(x, indices) {
    return math.subset(x, math.index.apply(math, _toConsumableArray(indices)));
  }
});
var emptyIndex = math.typed('emptyIndex', {
  'Array, number': function ArrayNumber(x, index) {
    return math.range(0, math.size(x)[index]);
  }
}); // Extract-Assignment

var arrayExtractAssign = math.typed('extractAssign', {
  'Array, boolean | number | string, ...number | Array': function ArrayBooleanNumberStringNumberArray(x, value, indices) {
    var indexArray = math.index.apply(math, _toConsumableArray(indices)),
        indexArrayDim = indexArray.size(),
        indexArrayLen = math.prod(indexArrayDim),
        indexArrayIsScaler = indexArrayLen === 1;

    if (indexArrayIsScaler) {
      // Both target and source are scalars
      return math.subset(x, math.index.apply(math, _toConsumableArray(indices)), value);
    } else {
      // Construct Array if target is Array but source is scalar 
      var values = Array(indexArrayLen).fill(value),
          valueArray = math.reshape(values, indexArrayDim);
      return math.subset(x, indexArray, valueArray);
    }
  },
  'Array, Array, ...number | Array': function ArrayArrayNumberArray(x, value, indices) {
    return math.subset(x, math.index.apply(math, _toConsumableArray(indices)), value);
  }
});
var dim = math.typed('dim', {
  'Array': function Array(x) {
    return math.size(x);
  }
});
var _default = {
  c: c,
  matrix2: matrix2,
  array: array,
  extract: arrayExtract,
  emptyIndex: emptyIndex,
  extractAssign: arrayExtractAssign,
  dim: dim
};
exports["default"] = _default;