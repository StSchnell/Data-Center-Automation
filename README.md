# Data Center Automation

In a data center, configuration and change processes cause a high proportion of the operating costs. Therefore it is worth automating IT processes in a data center infrastructure. This reduces the number of errors, simplifies the service configuration and increases their availability. This makes it possible to respond much more flexibly to new business requirements and to provide services more quickly.

This repository looks at some developer perspectives on data center automation with VMware Aria Automation. In particular, the use of libraries and tools are focused here.

<p align="center"><img src="images/newspaperSeller.png"></p>

## VMware Aria Automation

VMware Aria is a data center management platform that offers consistent handling of applications, infrastructures and services across different kind of clouds with a single common data model. A part of it is [VMware Aria Automation](https://www.vmware.com/products/aria-automation.html), a workflow automation platform with which complex data center infrastructure tasks can be automated or extended.

Four runtime environments are offered in VMware Aria Automation:
* JavaScript with Rhino engine,
* [Node.js](https://nodejs.org),
* PowerShell with PowerCLI and
* Python.

## Rhino

The [Rhino](https://github.com/mozilla/rhino) JavaScript engine is part of VMware Aria Automation runtime environments. It is programmed in Java and generates a class from the compiled JavaScript code. It was bundled with Java SE 6 and used as a programming interface in some business products, like VMware Aria Automation. Rhino can be used with Java 8 and above and is mostly compatible with the ECMAScript 5 standard.

## Emulation

VMware Aria Automation offers a System class, which contains a set of basic functions to offer standard processing methods for the most fundamental requirements in the context of its JavaScript runtime environment. To use these methods outside of Aria Automation, a library is available here to emulate the System class. This gives us the possibility to code and test Actions a bit more independently, without the direct use of an Orchestration environment.

This **m**ock-**u**p of the **S**ystem **cl**ass, called Muscle, bases on the same JavaScript engine used in Aria Automation, the Mozilla Rhino engine. To use this system class it is necessary to use the Rhino engine, because some of their methods access Java classes directly. This ensures us a consistent basis for simulation and operation.

To use this library in your code it is necessary to add `load("system.class.js");` at the beginning of the program. After that, all functions can be used seamlessly.

## Libraries

It is possible to use [JavaScript libraries](JavaScriptLibraries.md). By using libraries we create the possibility to extend the range of functions in a simple way.

## Tools

Also it is possible to use [JavaScript tools](JavaScriptTools.md).
