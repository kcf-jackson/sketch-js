/*--------------------------------------------------------
High-order functions
---------------------------------------------------------*/
const map = (x, f) => x.map(f)
const reduce = (x, f) => x.reduce(f)
const reduce_right = (x, f) => x.reduceRight(f)
const filter = (x, f) => x.filter(f)

export default{
    map: map,
    reduce: reduce,
    reduce_right: reduce_right,
    filter: filter
}
