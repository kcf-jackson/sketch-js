import { create, typedDependencies, typeOfDependencies } from "mathjs";
import { flatten, zipWith } from "ramda";
const { typed, typeOf } = create({ 
    typedDependencies, typeOfDependencies
}, { matrix: 'Array' })


/*========================================================= 
R functions
These functions should in general include all the data
types in JavaScript, i.e. null, undefined, number, string,
boolean, Array and Object, when it is appropriate to do so.

Notes:
- `math.typed` rejects all input with the wrong types.
- Functions from "math.js" automatically handles all
data types when applicable.
=========================================================*/

/**
 * Return the length of an object
 * 
 * @param {*} x A JavaScript object.
 * 
 * @return {number} An integer.
 * 
 * @example
 * // returns 0
 * length(null)
 * length(undefined)
 * @example
 * // returns 1
 * length(123)
 * length("abcd")
 * length(true)
 * @example
 * // returns 2
 * length([1, 2])
 * length({x:-999, y:999})
 * 
 * @exports
 */
const length = typed('length', {
    'null | undefined': x => 0,
    'number | string | boolean': x => 1,
    'Array': x => x.length,
    'Object': x => Object.keys(x).length
})


/**
 * Returns the indices of the true elements in an array
 * 
 * @param {Array} x An array of booleans.
 * 
 * @return {Array} An array of indices.
 * 
 * @example
 * // returns [0, 2]
 * which([true, false, true])
 * 
 * @exports
 */
const which = typed('which', {
    'Array': function(x) {
        let indexArray = Array.from({length: x.length}).map((_,i) => i);
        return indexArray.filter(i => x[i]);
    }
})


/**
 * Generates an arithmetic sequence of number.
 * 
 * @param {number} from A number; the starting value.
 * @param {number} to A number; the (maximal) ending value.
 * @param {number} by A number; increment of the sequence. 
 * @param {number} length_out A non-negative integer; the desired output length.
 * 
 * @return {Array} An array of numbers.
 * 
 * @example
 * // returns [1, 2, 3]
 * seq(1, 3)
 * @example
 * // returns [2, 4, 6, 8, 10]
 * seq(2, 10, 2)
 * @example
 * // returns [0, 2.5, 5, 7.5, 10]
 * seq(0, 10, null, 5)
 * 
 * @exports
 */
const seq = typed('seq_by', {
    'number, number': function(from, to) {
        if (from == to) return [from];
    	return seq(from, to, Math.sign(to - from));
    },
    'number, number, number': function(from = 1, to = 1, by = 1) {
        if (Math.sign(to - from) * Math.sign(by) < 0) {
            throw new Error(`Wrong sign in the third argument of (${from}, ${to}, ${by}).`)
        }
        
        let res = [], s = Math.sign(by);
        for (let i = 0; s * (from + i * by) <= s * to; i++) {
    		res.push(from + i * by);
    	}
    	return res;
    },
    'number, number, any, number': function(from = 1, to = 1, by, length_out) {
        if (by !== null) {
            throw new Error("The third argument('by') must be null if the fourth argument('length_out') is provided.")
        }
    	return seq(from, to, (to - from)/(length_out - 1));
    }
})


/**
 * Generates an arithmetic sequence of number.
 * 
 * @param {Array} along_with An Array, from which the length is taken.
 * 
 * @return {Array} A sequence of number from 0 to the last index of the Array.
 * 
 * @example
 * // returns [0, 1, 2]
 * seq_along(['a', 'b', 'c'])
 * 
 * @exports
 */
const seq_along = typed('seq_along', {
    'any' : function(along_with) {
        return seq(0, length(along_with) - 1, 1);
    }
})


/**
 * Replicate elements
 * 
 * @param {(number | Array)} x A number or a JavaScript Array; the element to replicate.
 * @param {number | Array} times A number; the number of times to replicate. If x is an 
 * array, then times can also be an array of the same size stating the the number of 
 * replications for each item in x.
 * 
 * @return A JavaScript Array
 * 
 * @example
 * // returns [1,1,1]
 * rep(1, 3)
 * @example
 * // returns [1,2,1,2,1,2]
 * rep([1,2], 3)
 * @example
 * // returns [1,1,2,2,2,2]
 * rep([1,2], [2,4])
 * 
 * @exports
 */
const rep = typed('rep', {
    'number | Array, number': function(x, times) {
    	return flatten(Array(times).fill(x));
    },
    'Array, Array': function(x, times) {
        return flatten(zipWith(rep, x, times));
    }
})


export * from "./base/distributions.js"
export * from "./base/funprog.js"
export * from "./base/group_generic.js"
export * from "./base/math_functions.js"
export * from "./base/sets.js"
export * from "./base/stats.js"
export * from "./base/utils.js"
// export * from "./base/extra.js"
export { length, typeOf as typeof, which, seq, seq_along, rep }
