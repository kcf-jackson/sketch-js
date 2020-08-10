/*--------------------------------------------------------
High-order functions
---------------------------------------------------------*/
import { curry, zipWith } from "ramda"

const map = (x, f) => x.map(f)
const map2 = (x, y, f) => x.map((el,ind) => f(x[ind], y[ind]))
const pmap = function(l, f) {
    let g = curry(f), init = l.shift();
    // The first list dictates the output length
    return l.reduce(zipWith((f,s) => f(s)), init.map(x => g(x)));
}
const reduce = (x, f) => x.reduce(f)
const reduce_right = (x, f) => x.reduceRight(f)
const filter = (x, f) => x.filter(f)

export { compose } from "ramda"
export {map, map2, pmap, reduce, reduce_right, filter}
