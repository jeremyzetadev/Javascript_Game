const { PI, add, Calculator } = require('./utils_OLDJS-require.js');

// const namespace_person = require('./namespace_person.js'); 

const valueshow = document.getElementById("calc");

console.log(PI);
console.log(add(7, 8));

const myCalc = new Calculator();
console.log(myCalc.multiply(3, 4));
if (valueshow) {
    valueshow.innerText += myCalc.multiply(10, 12);
}

namespace_person.MyModule.methodOne();
namespace_person.MyModule.methodTwo("Hello from outside!");
console.log("Module version: " + namespace_person.MyModule.version);

const instance1 = new namespace_person.PersonClass("Alice");
instance1.greet();

const instance2 = new namespace_person.AnotherClass();
instance2.doSomething();

