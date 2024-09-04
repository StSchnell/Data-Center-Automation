// Begin ---------------------------------------------------------------

/**
 * @param in_name {string}
 * @param in_age {number}
 * @returns {string}
 */

function addNumbers(a: number, b: number) : number {
  return a + b;
}

let subNumbers = (a: number, b: number) : number => {
  return a - b;
}

const getHelloWorld = (name: string, age: number) : string => {
  return `Hello World from ${name} with the age ${age.toString()}`;
}

function main(name: string, age: number) {

  const sum: number = addNumbers(10, 15);
  const diff: number = subNumbers(15, 10);
  const hello: string = getHelloWorld(name, age);

  return "Sum of the two numbers is: " + sum + "\n" +
    "Diff of the two numbers is: " + diff + "\n" +
    hello;

}

main(in_name, in_age);

// End -----------------------------------------------------------------
