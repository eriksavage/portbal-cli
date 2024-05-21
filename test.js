"use strict";

function testJs() {
  console.log("Executed from test.js");
};

function test2() {
  console.log("Test2");
}

// module.exports = { testJs };
export { testJs, test2 };