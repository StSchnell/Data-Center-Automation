
/* Begin----------------------------------------------------------------
 *
 * https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html
 */

#include <stdio.h>
#include <string.h>
#include <math.h>
#include <emscripten.h>

void EMSCRIPTEN_KEEPALIVE hello(char *name) {
  if (name == NULL) {
    printf("Hello World from C Language!\n");
  } else {
    printf("Hello %s from C Language!\n", name);
  }
}

int EMSCRIPTEN_KEEPALIVE int_sqrt(int x) {
  return sqrt(x);
}

// End------------------------------------------------------------------
