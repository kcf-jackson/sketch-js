const R = require("JEST_CONFIG_NAME_MAPPER/node-funprog.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing map", () => {
    let input, result, expected;
    let addOne = x => x + 1;
    input = [1,2,3,4,5];
    result = R.map(input, addOne);
    expected = [2,3,4,5,6];
    expect(result).toStrictEqual(expected);

    let addS = x => x + 's';
    input = ["apple", "orange"];
    result = R.map(input, addS);
    expected = ["apples", "oranges"];
    expect(result).toStrictEqual(expected);
})

test("Testing reduce", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.reduce(input, (a,b) => a + b);
    expected = 15;
    expect(result).toStrictEqual(expected);
})

test("Testing reduce_right", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.reduce(input, (a,b) => a + b);
    expected = 15;
    expect(result).toStrictEqual(expected);
})

test("Testing filter", () => {
    let input, result, expected;
    let isOdd = x => x % 2 == 1;
    input = [1,2,3,4,5];
    result = R.filter(input, isOdd);
    expected = [1,3,5];
    expect(result).toStrictEqual(expected);
})
