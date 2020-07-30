/*--------------------------------------------------------
Math functions
---------------------------------------------------------*/
// The following list of functions are ported from math.js directly without changes.
// pi, cos, sin, tan, acos, asin, atan, atan2, cosh, sinh, tanh, acosh, asinh, atanh
// cot, acot, coth, acoth, csc, acsc, csch, acsch, sec, asec, sech, asech

import { 
    create, typedDependencies, 
    cotDependencies, acotDependencies, cothDependencies, acothDependencies,
    cscDependencies, acscDependencies, cschDependencies, acschDependencies,
    secDependencies, asecDependencies, sechDependencies, asechDependencies,
    erfDependencies, logDependencies, gammaDependencies,
    combinationsDependencies, factorialDependencies
} from "mathjs";
import { broadcast } from "./distributions/dist";
import { mapAccumRight } from "ramda";

const math = create(
    { typedDependencies, 
        cotDependencies, acotDependencies, cothDependencies, acothDependencies,
        cscDependencies, acscDependencies, cschDependencies, acschDependencies,
        secDependencies, asecDependencies, sechDependencies, asechDependencies,
        erfDependencies, logDependencies, gammaDependencies, 
        combinationsDependencies, factorialDependencies },
    { matrix: 'Array' }
)


const ingamma = math.typed('ingamma', {
    'null | undefined | boolean | string | Object, any': function(a, x) { 
        throw new Error("non-numeric argument to mathematical function");
    },
    'any, null | undefined | boolean | string | Object': function(a, x) { 
        throw new Error("non-numeric argument to mathematical function");
    },
    'number | Array, number | Array': function(a, x) {
        let f = (a,x) => ingamma0(a,x).GIN;
        return broadcast(f)(a,x);
    }
})
/**
 * Compute incomplete gamma functions
 * @param {number} A A positive real number. (A LEQ 170)
 * @param {number} X A real number.
 * @return A triplet {GIN, GIM, GIP}, where 
 * GIN(A, X) := \int_0^x { t^{a - 1} * exp(-t) } dt
 * GIM(A, X) := Gamma(A) - GIN(A, X) = \int_x^{\infty} { t^{a - 1} * exp(-t) } dt
 * GIP(A, X) := GIN(A, X) / Gamma(A)
 */
function ingamma0(A, X) {
    // Reference: 
    // 1. https://www.rdocumentation.org/packages/pracma/versions/1.8.8/topics/gammainc
    // 2. Zhang, Sh., and J. Jin (1996). Computation of Special Functions. Wiley-Interscience, New York.
    let XAM = - X + A * Math.log(X)
    if (XAM > 700 || A > 170) {
        throw new Error("A and / or X too large.")
    }
    let GIN, GIM, GIP, GA, S, R, K, T0;
    if (X == 0.0) {
        GIN = 0.0;
        GA = math.gamma(A);
        GIM = GA;
        GIP = 0.0;
    } else if (X <= 1 + A) {
        S = 1.0 / A;
        R = S;
        for (K = 1; K <= 60; K++) {
            R = R * X / (A + K)
            S = S + R
            if (Math.abs(R / S) < 1e-15) {
                break
            }
        }
        GIN = Math.exp(XAM) * S
        GA = math.gamma(A)
        GIP = GIN / GA
        GIM = GA - GIN
    } else if (X > 1 + A) {
        T0 = 0.0
        for (K = 60; K >= 1; K--) {
            T0 = (K - A) / (1.0 + K / (X + T0))
        }
        GIM =  Math.exp(XAM) / (X + T0)
        GA = math.gamma(A)
        GIN = GA - GIM
        GIP = 1.0 - GIM / GA
    }
    return {
        GIN: GIN, GIM: GIM, GIP: GIP
    }
}


const choose = math.typed('choose', {
    'number, number': function(n, k) { 
        return math.combinations(n, k);
    },
    'number, Array': function(n, k) {
        return k.map(el => choose(n, el));
    },
    'Array, number': function(n, k) {
        return n.map(el => choose(el, k));
    },
    'Array, Array': function(n, k) {
        if (n.length != k.length) {
            throw new Error("The length of 'n' must match the length of 'k'.")
        }
        return n.map((el,i) => choose(n[i], k[i]));
    }
})

function lchoose(n, k) {
    return math.log(choose(n, k));
}


export default {
    cot: math.cot,
    csc: math.csc,
    sec: math.sec,
    
    acot: math.acot,
    acsc: math.acsc,
    asec: math.asec,
    
    coth: math.coth,
    csch: math.csch,
    sech: math.sech,
    
    acoth: math.acoth,
    acsch: math.acsch,
    asech: math.asech,
    
    erf: math.erf,
    factorial: math.factorial,
    choose: choose,
    lchoose: lchoose,

    ingamma: ingamma,
    ingamma0: ingamma0
};
