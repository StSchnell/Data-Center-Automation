// Begin ---------------------------------------------------------------

function addNumbers(a: number, b: number) : number {
  return a + b;
}

let subNumber = (a: number, b: number) : number => {
  return a - b;
}

const mulNumber = (a: number, b: number) : number => {
  return a * b;
}

interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  System.log(`${p.x}, ${p.y}`);
}

enum CardinalDirections {
  North,
  East,
  South,
  West
}

class Person {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

function getVcenters() {

  const vcenters: Array<string> = VcPlugin.allRegisteredInstances;

  vcenters.forEach( (vcenter) => {
    System.log(vcenter);
  });

}

function main() {

  const sum: number = addNumbers(10, 15);
  const diff: number = subNumber(15, 10);
  const prod: number = mulNumber(4, 4);

  System.log("Sum of the two numbers is: " + sum);
  System.warn("Diff of the two numbers is: " + diff);
  System.error("Product of the two numbers is: " + prod);

  const point = { x: 12, y: 26 };
  logPoint(point);

  let multilineString: string = `
    This is a multiline string.
    In TypeScript, we use backticks.
    It makes the code more readable.
  `;

  System.log(multilineString)

  let currentDirection = CardinalDirections.North;
  System.log("Current Direction is: " + currentDirection);

  const person = new Person("Stefan");
  System.log(person.getName());

  getVcenters();

}

main();

// End -----------------------------------------------------------------
