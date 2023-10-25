
# Begin ----------------------------------------------------------------

<#
 # @param {string} csharpSource
 # @returns {Properties}
 #
 # @author Stefan Schnell <mail@stefan-schnell.de>
 # @license MIT
 # @version 0.1.0
 #
 # Checked with Aria Automation 8.12.0
 #>

function Handler($context, $inputs) {

  Add-Type -TypeDefinition $inputs.csharpSource -Language CSharp;

  $result = [EntryPoint]::main();

  $output = @{
    status = "done"
    result = $result
  };

  return $output;

}

# End ------------------------------------------------------------------
