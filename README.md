# Data Center Automation

In a data center, configuration and change processes cause a high proportion of the operating costs. Therefore it is worth automating IT processes in a data center infrastructure. This reduces the number of errors, simplifies the service configuration and increases their availability. This makes it possible to respond much more flexibly to new business requirements and to provide services more quickly.

This repository looks at some developer perspectives on data center automation with VMware Aria Automation. In particular, the use of libraries and tools are focused here.

<p align="center"><img src="images/newspaperSeller.png"></p>

## VMware Cloud Foundation (VCF) Automation

VCF contains is a data center management platform that offers consistent handling of applications, infrastructures and services across different kind of clouds with a single common data model. A part of it is [VCF Automation](https://www.vmware.com/products/cloud-infrastructure/cloud-foundation-automation), a workflow automation platform with which complex data center infrastructure tasks can be automated or extended.

Four runtime environments are offered in VCF Automation:
* JavaScript with [Rhino engine](https://github.com/mozilla/rhino/),
* [Node.js](https://nodejs.org),
* PowerShell with PowerCLI and
* Python.

### Miscellaneous Information

* [JSON schema validator in VMware Aria Automation](https://github.com/mozilla/rhino/discussions/1466)

## Rhino

The [Rhino](https://github.com/mozilla/rhino) JavaScript engine is part of VMware Aria Automation runtime environments. It is programmed in Java and generates a class from the compiled JavaScript code. It was bundled with Java SE 6 and used as a programming interface in some business products, like VMware Aria Automation. Rhino can be used with Java 8 and above and is mostly compatible with the ECMAScript 5 standard.

* [Rhino Engine as Part of other Products](https://github.com/mozilla/rhino/discussions/1425)

### Miscellaneous Information

* [Attempt to Build Findings for Sustainability Considerations](https://github.com/orgs/Green-Software-Foundation/discussions/142)
* [Energy Consumption Measurement of Algorithms with Rhino](https://github.com/mozilla/rhino/discussions/1455)

## Emulation

Emulations imitate the behavior of functions. VMware Aria Automation offers, with the JavaScript runtime environment, a lot of classes, whose methods can be mocked-up on this way. This gives us the possibility to code and test Actions a bit more independently, without the direct use of an Orchestration environment. The mock-up classes here bases on the same JavaScript engine used in Aria Automation, the Mozilla Rhino engine, because some of their methods access Java classes directly. This ensures us a consistent basis for simulation and operation.

### System Class

VMware Aria Automation offers a system class, which contains a set of basic functions to offer standard processing methods for the most fundamental requirements. To use these methods outside of Aria Automation, a [library is available here to emulate the system class](https://github.com/StSchnell/Data-Center-Automation/blob/main/system.class.js). This **m**ock-**u**p of the **s**ystem **cl**ass called Muscle. 

To use this library in your code it is necessary to add `load("system.class.js");` at the beginning of the program. After that, all functions can be used seamlessly.

### Command Class

VMware Aria Automation offers a command class, to execute commands of the host operating system. To use these methods outside of Aria Automation, a [library is available here to emulate the command class](https://github.com/StSchnell/Data-Center-Automation/blob/main/command.class.js).

To use this library in your code it is necessary to add `load("command.class.js");` at the beginning of the program. After that, all functions can be used seamlessly.

### File Classes

VMware Aria Automation offers a file, file reader and file writer class, to operate with and handle the access to text files. To use these methods outside of Aria Automation, a [library is available here to emulate the file classes](https://github.com/StSchnell/Data-Center-Automation/blob/main/file.class.js).

To use this library in your code it is necessary to add `load("file.class.js");` at the beginning of the program. After that, all functions can be used seamlessly.

### ByteBuffer Class

VMware Aria Automation offers a byte buffer class, this is a wrapper around a byte array and used for passing references to binary content. To use these methods outside of Aria Automation, a [library is available here to emulate the byte buffer class](https://github.com/StSchnell/Data-Center-Automation/blob/main/bytebuffer.class.js).

To use this library in your code it is necessary to add `load("bytebuffer.class.js");` at the beginning of the program. After that, all functions can be used seamlessly.

### MimeAttachment Class

VMware Aria Automation offers a mime attachment class, to describe mime attachments. The Multipurpose Internet Mail Extensions (MIME) is a standard that extends the format of messages to support text in character sets other than ASCII. To use these methods outside of Aria Automation, a [library is available here to emulate the mime attachment class](https://github.com/StSchnell/Data-Center-Automation/blob/main/mimeattachment.class.js).

To use this library in your code it is necessary to add `load("mimeattachment.class.js");` at the beginning of the program. After that, all functions can be used seamlessly.

## Libraries

It is possible to use [JavaScript libraries](JavaScriptLibraries.md). By using libraries we create the possibility to extend the range of functions in a simple way.

## Tools

Also it is possible to use [JavaScript tools](JavaScriptTools.md).
