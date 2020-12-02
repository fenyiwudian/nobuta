var globalEvalTestObj = {};
eval('globalEvalTestObj.name="globalEvalTestObj"');
console.log(globalEvalTestObj, 'global execute eval and access global variable, ok!');

function localEvalAccessGlobalVariable() {
  var localEvalAccessGlobalVariableTestObj = {};
  eval('localEvalAccessGlobalVariableTestObj.name="localEvalAccessGlobalVariableTestObj"');
  console.log(localEvalAccessGlobalVariableTestObj, 'loacl eval access local variable obj:ok');
  eval('globalEvalTestObj.name+="localEvalAccessGlobalVariableTestObj"');
  console.log(globalEvalTestObj, 'local eval access global variable ok');
}
localEvalAccessGlobalVariable();

var globalNewFunctionTestObj = {};
(new Function('globalNewFunctionTestObj.name="globalNewFunctionTestObj"'))();
console.log(globalNewFunctionTestObj, 'global execute new function and access global variable, ok!');

function localNewFunctionAccessLocalVariable() {
  try {
    var localNewFunctionAccessLocalVariableTestObj = {};
    (new Function('localNewFunctionAccessLocalVariableTestObj.name="localNewFunctionAccessLocalVariableTestObj"'))();
    console.log(localNewFunctionAccessLocalVariableTestObj);
  } catch (e) {
    console.error(e, 'because local new Function try access local scope in new Function failed, because new Function execute in global scope');
  }
  (new Function('globalNewFunctionTestObj.name+="localNewFunctionAccessLocalVariableTestObj"'))();
  console.log(globalNewFunctionTestObj, 'local new function access global variable ok');
}
localNewFunctionAccessLocalVariable();


function generateVariableByEvalInLocal() {
  eval('var evalLocalVar = {name:"evalLocalVar"}');
  // eslint-disable-next-line
  console.log(evalLocalVar);
}
generateVariableByEvalInLocal();
try {
  // eslint-disable-next-line
  console.log(evalLocalVar);
} catch (e) {
  console.error(e, 'because eval generate local variable so can not be accessed from global scope');
}

function generateVariableByEvalInLocalStrictMode() {
  'use strict';
  eval('var evalLocalVarStrictMode = {name:"evalLocalVarStrictMode"}');
  // eslint-disable-next-line
  try {
    // eslint-disable-next-line
    console.log(evalLocalVarStrictMode);
  } catch (e) {
    console.error(e, 'because eval cannot generate variable in strict mode');
  }
}
generateVariableByEvalInLocalStrictMode();

(new Function('var newFunctionLocalVar = {name:"newFunctionLocalVar"}'))();
try {
  // eslint-disable-next-line
  console.log(newFunctionLocalVar);
} catch (e) {
  console.error(e, 'because new Function will neither generate variable to local nor global');
}

function generateVariableByNewFunctionInLocal() {
  (new Function('var newFunctionLocalVar = {name:"newFunctionLocalVar"}'))();
  try {
    // eslint-disable-next-line
    console.log(newFunctionLocalVar);
  } catch (e) {
    console.error(e, 'because new Function will neither generate variable to local nor global');
  }

}
generateVariableByNewFunctionInLocal();
