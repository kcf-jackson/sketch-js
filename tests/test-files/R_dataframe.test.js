const R = require("JEST_CONFIG_NAME_MAPPER/node-R_dataframe.js");

/*===================================================== 
  Test functions for R dataframe
=====================================================*/
test("Testing dataframe: constructor", () => {
    let input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
    let expected = [1,4];
    expect(input.toArray()[0]).toStrictEqual(expected);
})


test("Testing dataframe: extract", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.extract(input, 'x');
  expected = R.data_frame({ x: [1,2,3] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 0);
  expected = R.data_frame({ x: [1,2,3] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 'y');
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 1);
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [1]);
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, ['y']);
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  expect(() => {R.extract(input, [true])}).toThrow();
  
  result = R.extract(input, [0,1]);
  expected = input;
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 0, 'x');
  expected = R.data_frame({ x: [1] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [0,1], 'x');
  expected = R.data_frame({ x: [1,2] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [0,2], 'x');
  expected = R.data_frame({ x: [1,3] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [0,2], 0);
  expected = R.data_frame({ x: [1,3] });
  expect(result).toStrictEqual(expected);

  expect(() => {R.extract(input, ['1'], 'x')}).toThrow();
})


test("Testing dataframe: extract2", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.extract2(input, 'x');
  expected = [1,2,3];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 0);
  expected = [1,2,3];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 'y');
  expected = [4,5,6];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 1);
  expected = [4,5,6];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 0, 'x');
  expected = [1];
  expect(result).toStrictEqual(expected);
})


test("Testing dataframe: extractAssign", () => {
  // one-argument index
  // string, scalar
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.extractAssign(input, 'x', 1);
  expected = R.data_frame({ x: [1,1,1], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // string, Array
  result = R.extractAssign(input, 'x', [7,8,9]);
  expected = R.data_frame({ x: [7,8,9], y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extractAssign(input, 'y', [7,8,9]);
  expected = R.data_frame({ x: [1,2,3], y: [7,8,9] });
  expect(result).toStrictEqual(expected);

  result = () => {R.extractAssign(input, 'y', [7,8])};
  expect(result).toThrow();

  // number, scalar
  result = R.extractAssign(input, 0, 1);
  expected = R.data_frame({ x: [1,1,1], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // number, Array
  result = R.extractAssign(input, 0, [7,8,9]);
  expected = R.data_frame({ x: [7,8,9], y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extractAssign(input, 1, [7,8,9]);
  expected = R.data_frame({ x: [1,2,3], y: [7,8,9] });
  expect(result).toStrictEqual(expected);

  // Array, number
  result = R.extractAssign(input, ['x','y'], 99);
  expected = R.data_frame({ x: [99,99,99], y: [99,99,99] });
  expect(result).toStrictEqual(expected);

  // Array, Array
  result = R.extractAssign(input, ['x','y'], [[-1,-2],[-3,-4],[-5,-6]]);
  expected = R.data_frame({ x: [-1,-3,-5], y: [-2,-4,-6] });
  expect(result).toStrictEqual(expected);
  
  result = () => {R.extractAssign(input, ['x','y'], [[-1],[-4],[-6]])};
  expect(result).toThrow();

  result = () => {R.extractAssign(input, ['x','y'], [[-1,-2]])};
  expect(result).toThrow();

  // two-argument index
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  // number-string-scalar
  result = R.extractAssign(input, 1, 'x', 7);
  expected = R.data_frame({ x: [1,7,3], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // number-string-Array
  result = R.extractAssign(input, 1, 'y', [99]);
  expected = R.data_frame({ x: [1,2,3], y: [4,99,6] });
  expect(result).toStrictEqual(expected);

  result = () => {R.extractAssign(input, 1, 'y', [1,2])};
  expect(result).toThrow();
  
  // Array-string-scalar
  result = R.extractAssign(input, [0,1], 'x', 99);
  expected = R.data_frame({ x: [99,99,3], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // Array-string-Array
  result = R.extractAssign(input, [0,1], 'x', [7,77]);
  expected = R.data_frame({ x: [7,77,3], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  
  result = () => {R.extractAssign(input, [0,1], 'x', [7])}; // "length-one-vector matter"
  expect(result).toThrow();

  result = () => {R.extractAssign(input, [0,1], 'x', [7,8,9])}; 
  expect(result).toThrow();

  // number-Array-scalar
  result = R.extractAssign(input, 0, ['x','y'], 22);
  expected = R.data_frame({ x: [22,2,3], y: [22,5,6] });
  expect(result).toStrictEqual(expected);
  // number-Array-Array
  result = R.extractAssign(input, 0, ['x','y'], [22,88]);
  expected = R.data_frame({ x: [22,2,3], y: [88,5,6] });
  expect(result).toStrictEqual(expected);
  
  result = () => {R.extractAssign(input, 0, ['x','y'], [1,2,3])};
  expect(result).toThrow();

  // Array-Array-Array
  result = R.extractAssign(input, [0,1], ['x','y'], 10);
  expected = R.data_frame({ x: [10,10,3], y: [10,10,6] });
  expect(result).toStrictEqual(expected);

  result = R.extractAssign(input, [0,1], ['x','y'], [[-1,-2],[-3,-4]]);
  expected = R.data_frame({ x: [-1,-3,3], y: [-2,-4,6] });
  expect(result).toStrictEqual(expected);

  result = () => {R.extractAssign(input, [0,1], ['x','y'], [[-1],[-4]])};
  expect(result).toThrow();

  result = () => {R.extractAssign(input, [0,1], ['x','y'], [[-1,-2]])};
  expect(result).toThrow();
})

test("Testing dataframe: dim", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.dim(input);
  expected = [3,2];
  expect(result).toStrictEqual(expected);
})

test("Testing dataframe: print", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1], y: [4] });
  result = R.print(input);
  expected = "| x         | y         |\n------------------------\n| 1         | 4         |";
  expect(result).toStrictEqual(expected);
})

// test("Testing dataframe: mutate", () => {
// })

// test("Testing dataframe: select", () => {
//     let df0, result, expected;
//     df0 = new DataFrame([
//         {c1: 1, c2: 6, c3:4}, // <------- A row
//         {c1: 4, c2: 2, c3:4},
//         {c1: 2, c2: 10, c3:4}
//     ], ['c1', 'c2', 'c3']);

//     result = R.select(df0, 'c1');
//     expected = df0.select('c1');
//     expect(result).toStrictEqual(expected);

//     result = R.select(df0, 'c1', 'c3');
//     expected = df0.select('c1', 'c3');
//     expect(result).toStrictEqual(expected);
// })

// test("Testing dataframe: filter", () => {
// })

// test("Testing dataframe: summarise", () => {
// })

// test("Testing dataframe: arrange", () => {
//     let df0, result, expected;
//     df0 = new DataFrame([
//         {c1: 1, c2: 6}, // <------- A row
//         {c1: 4, c2: 2},
//         {c1: 2, c2: 10}
//     ], ['c1', 'c2']);
    
//     result = R.arrange(df0, 'c1');
//     expected = df0.sortBy('c1');
//     expect(result).toStrictEqual(expected);

//     result = R.arrange(df0, 'c1', true);
//     expected = df0.sortBy('c1', true);
//     expect(result).toStrictEqual(expected);

//     result = R.arrange(df0, ['c1', 'c2']);
//     expected = df0.sortBy(['c1', 'c2']);
//     expect(result).toStrictEqual(expected);

//     result = R.arrange(df0, ['c1', 'c2'], true);
//     expected = df0.sortBy(['c1', 'c2'], true);
//     expect(result).toStrictEqual(expected);
// })
