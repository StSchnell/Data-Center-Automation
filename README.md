# Data Center Automation

In a data center, configuration and change processes cause a high proportion of the operating costs. Therefore it is worth automating IT processes in a data center infrastructure. This reduces the number of errors, simplifies the service configuration and increases their availability. This makes it possible to respond much more flexibly to new business requirements and to provide services more quickly.

This repository looks at some developer perspectives on data center automation with VMware Aria Automation. In particular, the use of libraries and tools are focused here.

<span>![Newspaper seller](images/newspaperSeller.jpg)</span>

## VMware Aria Automation

VMware Aria is a data center management platform that offers consistent handling of applications, infrastructures and services across different kind of clouds with a single common data model. A part of it is [VMware Aria Automation](https://www.vmware.com/products/aria-automation.html), a workflow automation platform with which complex data center infrastructure tasks can be automated or extended.

Four runtime environments are offered in VMware Aria Automation:
* JavaScript with Rhino engine,
* [Node.js](https://nodejs.org),
* PowerShell with PowerCLI and
* Python.

## Rhino

The [Rhino](https://github.com/mozilla/rhino) JavaScript engine is part of VMware Aria Automation runtime environments. It is programmed in Java and generates a class from the compiled JavaScript code. It was bundled with Java SE 6 and used as a programming interface in some business products, like VMware Aria Automation. Rhino can be used with Java 8 and above and is mostly compatible with the ECMAScript 5 standard.

## Libraries

It is possible to use [JavaScript libraries](JavaScriptLibraries.md). By using libraries we create the possibility to extend the range of functions in a simple way.

## Tools

Also it is possible to use [JavaScript tools](JavaScriptTools.md).
