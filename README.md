# Data Center Automation

In a data center, configuration and change processes cause a high proportion of operating costs. Therefore it is worth automating IT processes in the data center infrastructure. This reduces the number of errors, simplifies the service configuration and increases their availability. This makes it possible to respond much more flexibly to new business requirements and to provide services more quickly.

## VMware Aria Automation

### Rhino

The [Rhino](https://github.com/mozilla/rhino) JavaScript engine is part of VMware Aria Automation runtime environments. It is programmed in Java and generates a class from the compiled JavaScript code. It was bundled with Java SE 6 and used as a programming interface in some business products. Rhino can be used with Java 8 and above and is mostly compatible with the ECMAScript 5 standard.

### LINQ - Library

[linq](https://github.com/mihaifm/linq) is a JavaScript implementation of the .NET LINQ library.

To use linq with Rhino, download the latest linq release. It is necessary to modify the source code of linq.js to the conditions of Rhino:

* Rhino does not support variable declaration with `let` and `const`, therefore these must be replaced by `var`.
* Rhino does not support `export` declaration, therefore the line `export default Enumerable;` at the end must be deleted.
* Rhino has no console window, therefore it is recommended to replace the code sequences `if (typeof console !== Types.Undefined) { console.log(...); }` with `java.lang.System.out.println(...)`.

After these preparations you can load it in your code with `load` command and use it:

```js
load("linq.js");

var result = Enumerable.range(1, 10)
  .where( function(i) { return i % 3 == 0 } )
  .select( function(i) { return i * 10 } );

java.lang.System.out.println(
  JSON.stringify(result.toArray())
); // [ 30, 60, 90 ]
```

### Papa Parse - Library

[Papa Parse](https://github.com/mholt/PapaParse) is a JavaScript library for parsing CSV or delimited text.

### XDate - Library

[XDate](https://github.com/arshaw/xdate) is a JavaScript date library for parsing, formatting and manipulating dates.
