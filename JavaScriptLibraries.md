# JavaScript Libraries

The following are some JavaScript libraries that can be used in the context of VCF Automation.

<p align="center"><img src="images/pergola.png"></p>

## Assert

Testing software is important, because programming errors can be very expensive and dangerous. A unit test is a kind of software testing. It checks the smallest piece of code that can be logically isolated. In JavaScript it is a function, method or attribute, and in VCF Automation it can also be an action. Unit tests helps to ensure that the software meets the requirements and the possibility of errors and bugs occurring are minimized.

When developing in the VCF Automation web GUI, the possibility of using a test framework is not really easy. The common JavaScript test frameworks are very fixated on browser environments and usually require Node.js for their execution. This makes an integration into this kind of development scenario difficult, because the specific requirements and conditions can hardly be considered. Therefore it can be seen as a valid approach to build an own unit test library, which fits seamlessly into this scenario.

This [VCF Automation assert library, called Aromatical](https://github.com/StSchnell/Data-Center-Automation/blob/main/assert.class.js), offers exactly this possibility. It provides 16 test methods, such as *isNumber* or *isString*, 17 assert methods, such as *deepEqual* or *notMatch*, 9 structuring and description methods, such as *describe* or *testTodo*, and classification properties for the test to specify the duration and risk level. E.g. with the command `var assert = System.getModule("yourModule").assert();` these methods can be called easily.

## LINQ

[linq](https://github.com/mihaifm/linq) is a JavaScript implementation of the .NET LINQ library.

You can find a [fork of linq](https://github.com/StSchnell/linq) here, with the additions to use it with the Rhino engine.

## Papa Parse

[Papa Parse](https://github.com/mholt/PapaParse) is a JavaScript library for parsing CSV or delimited text.

## XDate

[XDate](https://github.com/arshaw/xdate) is a JavaScript date library for parsing, formatting and manipulating dates.

## JSHint

[JSHint](https://github.com/jshint/jshint) is a JavaScript library for static code analysis for JavaScript.
