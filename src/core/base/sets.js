/*--------------------------------------------------------
Set functions
---------------------------------------------------------*/
import { 
    create, typedDependencies, 
    setDistinctDependencies,
    setUnionDependencies, setIntersectDependencies,
    setDifferenceDependencies, setSymDifferenceDependencies,
    setSizeDependencies, setIsSubsetDependencies,
    setMultiplicityDependencies
} from "mathjs";

const math = create(
    { typedDependencies, setDistinctDependencies,
        setUnionDependencies, setIntersectDependencies,
        setDifferenceDependencies, setSymDifferenceDependencies,
        setSizeDependencies, setIsSubsetDependencies,
        setMultiplicityDependencies },
    { matrix: 'Array' }
)


/**
 * The union of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; aA set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const union = function(x, y) {
    return math.setUnion(math.setDistinct(x), math.setDistinct(y))
}


/**
 * The intersection of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const intersect = function(x, y) {
    return math.setIntersect(math.setDistinct(x), math.setDistinct(y))
}


/**
 * The difference of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const setdiff = function(x, y) {
    return math.setDifference(math.setDistinct(x), math.setDistinct(y))
}


/**
 * Equality of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return {boolean} true or false.
 * @exports
 */
const setequal = function(x, y) {
    return math.setSize(math.setSymDifference(
        math.setDistinct(x), math.setDistinct(y)
    )) === 0;
}


/**
 * Check if an element belongs to a set
 * @param x An element, or an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const is_element = math.typed('is_element', {
    'number, Array': function(x, y) {
        return math.setIsSubset([x], y);
    }, 
    'Array, Array' : function(x, y) {
        return x.map(x => math.setIsSubset([x], y));
    }
})


/**
 * The symmetric difference of two sets
 * @param {Array} x An array of elements.
 * @param {Array} y An array of elements.
 * @return An array of elements.
 * @exports
 */
const setsymdiff = function(x, y) {
    return math.setSymDifference(math.setDistinct(x), math.setDistinct(y))
}


// table = function(xs) {
//     let set = math.setDistinct(xs)
//     return {
//         element: set, 
//         count: set.map(el => math.setMultiplicity(el, xs))
//     };
// }


export default {
    unique: math.setDistinct,
    union: union,
    intersect: intersect,
    setdiff: setdiff,
    setequal: setequal,
    is_element: is_element,
    // table: table
    // extra
    is_subset: math.setIsSubset,
    setsymdiff: setsymdiff,
    count: math.setMultiplicity
};
