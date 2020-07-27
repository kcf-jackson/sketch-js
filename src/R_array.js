import {
    create, 
    typedDependencies,
    flattenDependencies,
    transposeDependencies,
    reshapeDependencies,
    subsetDependencies,
    indexDependencies,
    prodDependencies,
    rangeDependencies,
    sizeDependencies
} from "mathjs";

const math = create({
    typedDependencies,
    flattenDependencies,
    transposeDependencies,
    reshapeDependencies,
    subsetDependencies,
    indexDependencies,
    prodDependencies,
    rangeDependencies,
    sizeDependencies
}, {matrix: 'Array'})

// Combine values into a vector
function c() {
    return math.flatten([...arguments]);
}

// Matrices
const matrix2 = math.typed('matrix2', {
    'null | undefined | number | string | boolean | Array, number, number': function(x, nrow, ncol) {
        return matrix2(x, nrow, ncol, false);
    },
    'null | undefined | number | string | boolean, number, number, boolean': function(x, nrow, ncol, byrow = false) {
        let y = Array(nrow * ncol).fill(x);
        return matrix2(y, nrow, ncol, byrow);
    },
    'Array, number, number, boolean': function(x, nrow, ncol, byrow = false) {
        return byrow?
            math.reshape(x, [nrow, ncol]):
            math.transpose(math.reshape(x, [ncol, nrow]));
    }
})

// Array
const array = math.typed('array', {
    'number, Array': function(x, dims) {
        let y = Array(math.prod(dims)).fill(x);
        return array(y, dims);
    },
    'Array, Array': (x, dims) => math.reshape(x, dims)
})


/* Extractor
The array class (including vectors and matrices) supports 
only the `[` extractor, but not the `[[` extractor.
The extractor takes any number of arguments, and each of them 
can be a number or a (R-)vector. 
*/
const arrayExtract = math.typed('extract', {
    'Array, ...number | Array': function(x, indices) {
        return math.subset(x, math.index(...indices));
    }
})

const emptyIndex = math.typed('emptyIndex', {
    'Array, number': function(x, index) {
        return math.range(0, math.size(x)[index])
    }
})


// Extract-Assignment
const arrayExtractAssign = math.typed('extractAssign', {
    'Array, boolean | number | string, ...number | Array': function(x, value, indices) {
        let indexArray = math.index(...indices),
            indexArrayDim = indexArray.size(),
            indexArrayLen = math.prod(indexArrayDim),
            indexArrayIsScaler = indexArrayLen === 1;
        if (indexArrayIsScaler) {
            // Both target and source are scalars
            return math.subset(x, math.index(...indices), value);
        } else {
            // Construct Array if target is Array but source is scalar 
            let values = Array(indexArrayLen).fill(value),
                valueArray = math.reshape(values, indexArrayDim);
            return math.subset(x, indexArray, valueArray);
        }
    },
    'Array, Array, ...number | Array': function(x, value, indices) {
        return math.subset(x, math.index(...indices), value);
    }
})


const dim = math.typed('dim', {
    'null | undefined | number | string | boolean | Object': x => null,
    'Array': x => math.size(x)
})


export default {
    c: c,
    matrix2: matrix2,   // name clash with math.js
    array: array,
    extract: arrayExtract,
    emptyIndex: emptyIndex,
    extractAssign: arrayExtractAssign,
    dim: dim
}
