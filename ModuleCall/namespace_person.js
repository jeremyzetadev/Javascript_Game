// Define a global namespace object, ensuring it exists without overwriting
var namespace_person = namespace_person || {};

// Define a submodule within the namespace using an IIFE
namespace_person.MyModule = (function() {
    // Private variables and functions within the module
    var privateData = "This is private data.";

    function privateFunction() {
        console.log("This is a private function.");
    }

    // Public API of the module
    function publicMethodOne() {
        console.log("Public method one called.");
        privateFunction(); // Can access private functions
    }

    function publicMethodTwo(message) {
        console.log("Public method two received: " + message);
        console.log("Accessing private data: " + privateData);
    }


    ////////////////////// CLASS IN NAMESPACE //////////////////////////////
    ////////////////////// CLASS IN NAMESPACE //////////////////////////////
    // Define a class within the namespace
    namespace_person.PersonClass = class {
        constructor(name) {
            this.name = name;
        }

        greet() {
            console.log(`Hello from namespace_person.PersonClass, ${this.name}!`);
        }
    };

    // Define another class or function within the same namespace
    namespace_person.AnotherClass = class {
        doSomething() {
            console.log("Doing something in namespace_person.AnotherClass.");
        }
    };
    ////////////////////// CLASS IN NAMESPACE //////////////////////////////
    ////////////////////// CLASS IN NAMESPACE //////////////////////////////

    // Return an object containing the public methods and properties
    return {
        methodOne: publicMethodOne,
        methodTwo: publicMethodTwo,
        version: "1.0.0" // A public property
    };
})();

// Usage of the namespace and module
// namespace_person.MyModule.methodOne();
// namespace_person.MyModule.methodTwo("Hello from outside!");
// console.log("Module version: " + namespace_person.MyModule.version);

// Usage
// const instance1 = new namespace_person.PersonClass("Alice");
// instance1.greet();
//
// const instance2 = new namespace_person.AnotherClass();
// instance2.doSomething();


