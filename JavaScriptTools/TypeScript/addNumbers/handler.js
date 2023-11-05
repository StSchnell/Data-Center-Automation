// Begin ---------------------------------------------------------------

/**
 * @param {string} typescriptSource
 * @param {string} actionName
 * @returns {Properties}
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.4.0
 *
 * Checked with Aria Automation 8.13.1
 */

exports.handler = (context, inputs, callback) => {

  "use strict";

  const os = require("node:os");
  const fs = require("node:fs");
  const typescript = require('./typescript.js');

  const compilerOptions = {
    module: typescript.ModuleKind.CommonJS,
    target: typescript.ScriptTarget.ES5,
    strictNullChecks: true
  };

  const inMemoryFileName = `${os.tmpdir()}/${inputs.actionName}.ts`;
  try {
    fs.accessSync(fileName, fs.constants.F_OK);
    fs.rmSync(fileName, { force: true } );
  } catch (exception) {
  }

  const host = typescript.createCompilerHost(compilerOptions);
  host.writeFile(inMemoryFileName, inputs.typescriptSource);
  const program = typescript.createProgram([inMemoryFileName], compilerOptions, host);
  const emitResult = program.emit();
  const allDiagnostics =
    typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  if (allDiagnostics.length > 0) {
    console.log("");
    allDiagnostics.forEach(diagnostic => {
      if (diagnostic.file) {
        let { line, character } = typescript.getLineAndCharacterOfPosition(
          diagnostic.file,
          diagnostic.start
        );
        let message = typescript.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        );
        console.log(`[Line ${line + 1}, Column ${character + 1}] ${message}`);
      } else {
        console.log(
          typescript.flattenDiagnosticMessageText(
            diagnostic.messageText,
            "\n"
          )
        );
      }
    });
  }

  const javascriptSource = typescript.transpileModule(
    inputs.typescriptSource,
    compilerOptions
  );

  callback(undefined, {
    status: "done",
    javascriptSource: javascriptSource.outputText
  });

};

// End -----------------------------------------------------------------
