/*--------------------------------------------------------
Binomial distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { discrete_inverse } from "../stats"
import { create, combinationsDependencies, randomDependencies } from "mathjs";
const { combinations, random } = create({ 
    combinationsDependencies, randomDependencies 
}, {matrix: 'Array'})



// Binomial
function dbinom0(x, size, prob) {
    if (size < 0) throw new Error("The number of trials must be a non-negative integer.")
    if (prob < 0 || prob > 1) throw new Error("Success probability must be between 0 an 1.")
    return combinations(size,  x) * (prob ** x) * (1 - prob) ** (size - x);
}

function pbinom0(q, size, prob) {
    if (size < 0) throw new Error("The number of trials must be a non-negative integer.")
    if (prob < 0 || prob > 1) throw new Error("Success probability must be between 0 an 1.")
    let sum = 0;
    for (let k = 0; k <= q; k++) {
        sum += dbinom0(k, size, prob)
    }
    return sum;
}

function qbinom0(p, size, prob) {
    if (size < 0) throw new Error("The number of trials must be a non-negative integer.")
    if (prob < 0 || prob > 1) throw new Error("Success probability must be between 0 an 1.")
    let f = x => dbinom0(x, size, prob);
    return discrete_inverse(p, f, 0);
}

function rbinom0(size, prob) {
    if (size < 0) throw new Error("The number of trials must be a non-negative integer.")
    if (prob < 0 || prob > 1) throw new Error("Success probability must be between 0 an 1.")
    return qbinom0(random(), size, prob);
}



/**
 * The Binomial distribution (PDF)
 * 
 * @param {number | Array} x The vector of quantiles.
 * @param {number | Array} size The number of trials.
 * @param {number | Array} prob The probability of success.
 * @param {boolean} log Whether to return the log value.
 * 
 * @exports
 */
const dbinom = function(x, size, prob, log = false) {
    // Provides names for the extended function
    let f = (x, size, prob) => ddist(dbinom0)(x, size, prob, log);
    return broadcast(f)(x, size, prob);
}


/**
 * The Binomial distribution (CDF)
 * 
 * @param {number | Array} q The vector of quantiles.
 * @param {number | Array} size The number of trials.
 * @param {number | Array} prob The probability of success.
 * @param {boolean} lower_tail Whether to return the lower (or upper) tail.
 * @param {boolean} log Whether to return the log value.
 * 
 * @exports
 */
const pbinom = function(q, size, prob, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, size, prob) => pdist(pbinom0)(q, size, prob, lower_tail, log_p);
    return broadcast(f)(q, size, prob);
}


/**
 * The Binomial distribution (Quantile)
 * 
 * @param {number | Array} p The vector of probabilities.
 * @param {number | Array} size The number of trials.
 * @param {number | Array} prob The probability of success.
 * @param {boolean} lower_tail Whether to return the lower (or upper) tail.
 * @param {boolean} log Whether to return the log value.
 
 * 
 * @exports
 */
const qbinom = function(p, size, prob, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, size, prob) => qdist(qbinom0)(p, size, prob, lower_tail, log_p);
    return broadcast(f)(p, size, prob);
}


/**
 * The Binomial distribution (Sampling)
 * 
 * @param {number} n The number of samples.
 * @param {number | Array} size The number of trials.
 * @param {number | Array} prob The probability of success.
 * 
 * @exports
 */
const rbinom = function(n, size, prob) {
    // Provides names for the extended function
    let f = (n, size, prob) => rbinom0(size, prob);
    return broadcast(f)(Array.from({length: n}), size, prob);
}


export { dbinom, pbinom, qbinom, rbinom }
