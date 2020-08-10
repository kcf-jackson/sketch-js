const R = require("JEST_CONFIG_NAME_MAPPER/node-base.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing base::walk", () => {
    let input, result, expected;
    let addOne = x => x + 1;
    let addS = x => x + 's';
    input = 10;
    result = R.walk(input, addOne);
    expected = 11;
    expect(result).toStrictEqual(expected);

    input = ["plant", "apple"];
    result = R.walk(input, addS);
    expected = ["plants", "apples"];
    expect(result).toStrictEqual(expected);

    input = [1,2,[3,4],[5,[6,7],8]];
    result = R.walk(input, addOne);
    expected = [2,3,[4,5],[6,[7,8],9]];
    expect(result).toStrictEqual(expected);
})

test("Testing base::length", () => {
    let input, result, expected;
    input = null;
    result = R.length(input);
    expected = 0;
    expect(result).toBe(expected);
    
    input = undefined;
    result = R.length(input);
    expected = 0;
    expect(result).toBe(expected);
    
    input = 9999;
    result = R.length(input);
    expected = 1;
    expect(result).toBe(expected);
 
    input = "abcde";
    result = R.length(input);
    expected = 1;
    expect(result).toBe(expected);
 
    input = true;
    result = R.length(input);
    expected = 1;
    expect(result).toBe(expected);

    input = [1,2,[3,4],[5,[6,7],8]];
    result = R.length(input);
    expected = 4;
    expect(result).toBe(expected);

    input = {x:1, y:2, z:3}
    result = R.length(input);
    expected = 3;
    expect(result).toBe(expected);    
})

test("Testing base::first", () => {
    let input, result, expected;
    input = null;
    result = R.first(input);
    expected = null;
    expect(result).toStrictEqual(expected);

    input = undefined;
    result = R.first(input);
    expected = undefined;
    expect(result).toStrictEqual(expected);

    input = 3;
    result = R.first(input);
    expected = 3;
    expect(result).toStrictEqual(expected);
    
    input = 'a';
    result = R.first(input);
    expected = 'a';
    expect(result).toStrictEqual(expected);

    input = false;
    result = R.first(input);
    expected = false;
    expect(result).toStrictEqual(expected);

    input = [1,2,3,4,5];
    result = R.first(input);
    expected = 1;
    expect(result).toStrictEqual(expected);

    input = [[0,1],2,3,4,5];
    result = R.first(input);
    expected = [0,1];
    expect(result).toStrictEqual(expected);

    input = {x:1, y:2};
    result = R.first(input);
    expected = 1;
    expect(result).toStrictEqual(expected);
})

test("Testing base::digamma", () => {
    let input, result, expected;
    input = 123;
    result = R.digamma(input);
    expected = 4.808113806573255;
    expect(result).toBe(expected);

    input = 1e-7;
    result = R.digamma(input);
    expected = -10000000.577215664;
    expect(result).toBe(expected);

    input = 0.0;
    result = R.digamma(input);
    expected = undefined;
    expect(result).toBe(expected);

    input = true;
    result = R.digamma(input);
    expected = R.digamma(1.0);
    expect(result).toBe(expected);

    input = false;
    result = R.digamma(input);
    expected = R.digamma(0.0);
    expect(result).toBe(expected);

    input = [12, 123];
    result = R.digamma(input);
    expected = [2.4426616799662653, 4.808113806573255];   // cross-checked with R
    expect(result).toStrictEqual(expected);

    expect(() => { R.digamma(null) }).toThrow();
    expect(() => { R.digamma(undefined) }).toThrow();
    expect(() => { R.digamma("a") }).toThrow();
    expect(() => { R.digamma({x:1}) }).toThrow();
})

test("Testing base::trigamma", () => {
    let input, result, expected;
    input = 123;
    result = R.trigamma(input);
    expected = 0.008163219974594384;
    expect(result).toBe(expected);

    input = 1e-7;
    result = R.trigamma(input);
    expected = 100000000000000.02;
    expect(result).toBe(expected);

    input = 0.0;
    result = R.trigamma(input);
    expected = undefined;
    expect(result).toBe(expected);

    input = [12, 123];
    result = R.trigamma(input);
    expected = [0.08690187287168802, 0.008163219974594384]; // cross-checked with R
    expect(result).toStrictEqual(expected);

    input = true;
    result = R.trigamma(input);
    expected = R.trigamma(1.0);
    expect(result).toBe(expected);

    input = false;
    result = R.trigamma(input);
    expected = R.trigamma(0.0);
    expect(result).toBe(expected);

    expect(() => { R.trigamma(null) }).toThrow();
    expect(() => { R.trigamma(undefined) }).toThrow();
    expect(() => { R.trigamma("a") }).toThrow();
    expect(() => { R.trigamma({x:1}) }).toThrow();
})

test("Testing base::range2", () => {
    let input, result, expected;
    input = 1;
    result = R.range2(input);
    expected = [1,1];
    expect(result).toStrictEqual(expected);

    input = [1,2,3,4,5];
    result = R.range2(input);
    expected = [1,5];
    expect(result).toStrictEqual(expected);

    input = [1,2,[3,8],5];
    result = R.range2(input);
    expected = [1,8];
    expect(result).toStrictEqual(expected);
})


// Continue from here
test("Testing base::all", () => {
    let input, result, expected;
    input = [true, true];
    result = R.all(input);
    expected = true;
    expect(result).toStrictEqual(expected);

    input = [true, [false, true]];
    result = R.all(input);
    expected = false;
    expect(result).toStrictEqual(expected);

    result = R.all(true, false);
    expected = false;
    expect(result).toStrictEqual(expected);

    result = R.all(false, false);
    expected = false;
    expect(result).toStrictEqual(expected);
})


test("Testing base::any", () => {
    let input, result, expected;
    input = [true, true];
    result = R.any(input);
    expected = true;
    expect(result).toStrictEqual(expected);

    input = [true, [false, true]];
    result = R.any(input);
    expected = true;
    expect(result).toStrictEqual(expected);

    result = R.any(true, false);
    expected = true;
    expect(result).toStrictEqual(expected);

    result = R.any(false, false);
    expected = false;
    expect(result).toStrictEqual(expected);
})


// test("Testing base::walk", () => {
//     let input, result, expected;
//     input = ;
//     result = ;
//     expected = ;
//     expect(result).toStrictEqual(expected);
// })


// test("Testing base::walk", () => {
//     let input, result, expected;
//     input = ;
//     result = ;
//     expected = ;
//     expect(result).toStrictEqual(expected);
// })


// test("Testing base::walk", () => {
//     let input, result, expected;
//     input = ;
//     result = ;
//     expected = ;
//     expect(result).toStrictEqual(expected);
// })


// test("Testing base::walk", () => {
//     let input, result, expected;
//     input = ;
//     result = ;
//     expected = ;
//     expect(result).toStrictEqual(expected);
// })


// test("Testing base::walk", () => {
//     let input, result, expected;
//     input = ;
//     result = ;
//     expected = ;
//     expect(result).toStrictEqual(expected);
// })



// const R = require("../dist/R-node.js");
// const DataFrame = require('dataframe-js').DataFrame;



// /*===================================================== 
//   Test functions for R vector
// =====================================================*/
// test("Testing R.add", () => {
//     let result = R.add([1,2], [2,3]);
//     let expected = [3,5];
//     expect(result).toStrictEqual(expected);

//     result = R.add(1, 2);
//     expected = 3;
//     expect(result).toBe(expected);
// })


// test("Testing R.subtract", () => {
//     let result = R.subtract([1,2], [2,3]);
//     let expected = [-1,-1];
//     expect(result).toStrictEqual(expected);


//     result = R.subtract(1, 2);
//     expected = -1;
//     expect(result).toBe(expected);
// })


// test("Testing R.multiply", () => {
//     let result = R.multiply([1,2], [2,3]);
//     let expected = [2,6];
//     expect(result).toStrictEqual(expected);

//     result = R.multiply(1, 2);
//     expected = 2;
//     expect(result).toBe(expected);
// })


// test("Testing R.divide", () => {
//     let result = R.divide([1,2], [2,3]);
//     let expected = [0.5, 2/3];
//     expect(result).toStrictEqual(expected);

//     result = R.divide(1, 2);
//     expected = 0.5;
//     expect(result).toBe(expected);
// })


// test("Testing R.pow", () => {
//     let result = R.pow([1,2], [2,3]);
//     let expected = [1,8];
//     expect(result).toStrictEqual(expected);

//     result = R.pow(3, 2);
//     expected = 9;
//     expect(result).toBe(expected);
// })


// test("Testing R.mod", () => {
//     let result = R.mod([5,7], [2,3]);
//     let expected = [1,1];
//     expect(result).toStrictEqual(expected);

//     result = R.mod(11, 3);
//     expected = 2;
//     expect(result).toBe(expected);
// })


// test("Testing R.cummax", () => {
//     let result = R.cummax([3,4,5,1]);
//     let expected = [3,4,5,5];
//     expect(result).toStrictEqual(expected);

//     result = R.cummax(5);
//     expected = 5;
//     expect(result).toBe(expected);
// })


// test("Testing R.all", () => {
//     let result = R.all([true, false, true]);
//     let expected = false;
//     expect(result).toStrictEqual(expected);

//     result = R.all(false, false);
//     expected = false;
//     expect(result).toBe(expected);
// })
