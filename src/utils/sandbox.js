import Interpreter from "js-interpreter";
const EMPTY_INVOKE_TARGET = "";
const EMPTY_INVODE_ARGUMENTS = [];
const createSandbox = (src) => {
  // Create interpreter from user code
  const interpreter = new Interpreter(src);
  // Retrieve global object from interpreter
  const globalScope = interpreter.getGlobalScope().object;
  // Define sandbox state that will be shared between pseudo code and the sandbox
  const state = {
    running: true,
    fInvoked: false,
    fInvokeTarget: "",
    fInvokeArgs: [],
  };
  // Wrap the sand box state (puts it in closure) since
  // interpreter.nativeToPseudo kinda copies the object values.
  const stateWrapped = {
    getInvokeTarget: () => {
      return state.fInvokeTarget;
    },
    getInvokeArgs: () => {
      return state.fInvokeArgs;
    },
    isRunning: () => {
      return state.running;
    },
    setInvoked: () => {
      state.fInvoked = true;
      state.fInvokeTarget = EMPTY_INVOKE_TARGET;
      state.fInvokeArgs = EMPTY_INVODE_ARGUMENTS;
    },
  };
  // Define function that executes pseudo code, which is private
  const execute = () => {
    let steps = 0;
    // Either the code executes to the end or a function gets invoked, break.
    while (interpreter.step() && !state.fInvoked) {
      steps++;
      if (steps > 1000 /* some arbitrary limit you set */) {
        throw Error("Are you trying to infinite loop?");
      }
    }
  };
  // Execute user code first (there's nothing in the global scope yet)
  execute();
  // Append our sandbox code now.
  interpreter.appendCode(`
          // Self invoking function here, not accessible from user code :)
          (function () {
          // Get the sandbox state from the global scope.
              var state = window.state;
  
              // Now we have the state, delete it from the global scope 
              // so the user code won't be able to get it and cause chaos :)
              delete window.state;
  
              // A regular loop to invoke functions
              while (state.isRunning()) {
                  // Get the function we would like to invoke.
                  var f = window[state.getInvokeTarget()];
  
                  // Get the args as well
                  var args = state.getInvokeArgs();
  
                  // Call the function if user code defined it.
                  if (typeof f === "function") {
                      f.apply(this, args);
                      // Probably could also put the return value into the sandbox state
                      // so the 'invoke' API function could return it.
                  }
  
                  // Set fInvoked to true so the execution would stop.
                  state.setInvoked();
              }
  
              // Remove the sandbox state reference when we are done.
              state = undefined;
          })();
    `);
  // Bind the sandbox state that the sandbox code will use.
  interpreter.setProperty(
    globalScope,
    "state",
    interpreter.nativeToPseudo(stateWrapped)
  );
  // Execute sandbox code
  execute();
  // Now we are in the function invoking loop, return the API object.
  return {
    // API to bind objects to pseudo code's global scope
    bind: (name, obj) => {
      interpreter.setProperty(
        globalScope,
        name,
        interpreter.nativeToPseudo(obj)
      );
    },
    // API to invoke a function defined by the pseudo code
    invoke: (functionName, ...args) => {
      state.fInvoked = false;
      state.fInvokeTarget = functionName;
      state.fInvokeArgs = args;
      execute();
    },
    // API to dispose the sandbox
    dispose: () => {
      state.running = false;
      state.fInvokeTarget = "";
      execute();
      interpreter.setProperty(globalScope, "state", undefined);
    },
  };
};

export default createSandbox;
