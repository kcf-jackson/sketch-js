import { create, typedDependencies, typeOfDependencies } from "mathjs";
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
 * @param x A JavaScript object.
 * @return An integer.
 * @exports
 */
const length = typed('length', {
    'null | undefined': x => 0,
    'number | string | boolean': x => 1,
    'Array': x => x.length,
    'Object': x => Object.keys(x).length
})


const which = typed('which', {
    'Array': function(x) {
        let indexArray = Array.from({length: x.length}).map((_,i) => i);
        return indexArray.filter(i => x[i]);
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
export { length, typeOf as typeof, which}
