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

const {
    typed, flatten, transpose, reshape, subset, index, prod, range, size
} = create({
    typedDependencies,
    flattenDependencies,
    transposeDependencies,
    reshapeDependencies,
    subsetDependencies,
    indexDependencies,
    prodDependencies,
    rangeDependencies,
    sizeDependencies
}, { matrix: 'Array' })

// Combine values into a vector
function c() {
    return flatten([...arguments]);
}

// Matrices
const matrix2 = typed('matrix2', {
    'null | undefined | number | string | boolean | Array, number, number': function(x, nrow, ncol) {
        return matrix2(x, nrow, ncol, false);
    },
    'null | undefined | number | string | boolean, number, number, boolean': function(x, nrow, ncol, byrow = false) {
        let y = Array(nrow * ncol).fill(x);
        return matrix2(y, nrow, ncol, byrow);
    },
    'Array, number, number, boolean': function(x, nrow, ncol, byrow = false) {
        return byrow?
            reshape(x, [nrow, ncol]):
            transpose(reshape(x, [ncol, nrow]));
    }
})

// Array
const array = typed('array', {
    'number, Array': function(x, dims) {
        let y = Array(prod(dims)).fill(x);
        return array(y, dims);
    },
    'Array, Array': (x, dims) => reshape(x, dims)
})


/* Extractor
The array class (including vectors and matrices) supports 
only the `[` extractor, but not the `[[` extractor.
The extractor takes any number of arguments, and each of them 
can be a number or a (R-)vector. 
*/
const arrayExtract = typed('extract', {
    'Array, ...number | Array': function(x, indices) {
        return subset(x, index(...indices));
    }
})

const emptyIndex = typed('emptyIndex', {
    'Array, number': function(x, index) {
        return range(0, size(x)[index])
    }
})


// Extract-Assignment
const arrayExtractAssign = typed('extractAssign', {
    'Array, boolean | number | string, ...number | Array': function(x, value, indices) {
        let indexArray = index(...indices),
            indexArrayDim = indexArray.size(),
            indexArrayLen = prod(indexArrayDim),
            indexArrayIsScaler = indexArrayLen === 1;
        if (indexArrayIsScaler) {
            // Both target and source are scalars
            return subset(x, index(...indices), value);
        } else {
            // Construct Array if target is Array but source is scalar 
            let values = Array(indexArrayLen).fill(value),
                valueArray = reshape(values, indexArrayDim);
            return subset(x, indexArray, valueArray);
        }
    },
    'Array, Array, ...number | Array': function(x, value, indices) {
        return subset(x, index(...indices), value);
    }
})


const dim = typed('dim', {
    'null | undefined | number | string | boolean | Object': x => null,
    'Array': x => size(x)
})


export {
    c,
    matrix2,   // name clash with math.js
    array,
    arrayExtract as extract,
    emptyIndex,
    arrayExtractAssign as extractAssign,
    dim
}
