
/* Begin----------------------------------------------------------------
 *
 * Node.js test action to check Emscripten compiler to WebAssembly
 *
 * Checked with VMware Aria Automation 8.5.1 and Node.js 12.22.1
 *
 * @param sqrtFrom {number}
 * @returns CompositeType(
 *   status {string},
 *   result {number}
 * ):test
 */

exports.handler = (context, inputs, callback) => {

  let sqrtFrom = inputs.sqrtFrom;

  const helloWorld = require("./helloWorld.js");

  let result = helloWorld.onRuntimeInitialized = () => {

    helloWorld._hello(); // Using vdirect call

    // Using ccall: calls a compiled C function with specified
    // parameters and returns the result.
    helloWorld.ccall("hello", null, ["string"], ["Gabi"]);

    // Using cwrap: wraps a compiled C function and returns a JavaScript
    // function you can call normally. This is therefore more useful if
    // you plan to call a compiled function a number of times.
    const hello = helloWorld.cwrap("hello", null, ["string"]);
    hello("Stefan");

    let result = helloWorld._int_sqrt(4);
    console.log(result);
    console.log(helloWorld.ccall("int_sqrt", "number", ["number"], [25]));
    const intSqrt = helloWorld.cwrap("int_sqrt", "number", ["number"]);
    console.log(intSqrt(36));
    let fromSqrt = intSqrt(sqrtFrom);
    console.log(fromSqrt);

    callback(undefined, {status: "done", result: fromSqrt});

  }

}

// End------------------------------------------------------------------
