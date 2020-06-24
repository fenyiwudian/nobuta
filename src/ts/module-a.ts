import { DO_TYPE } from "./basic-types";

/**
 * 模块A做些事情
 * @param type 
 */
export function doModuleA(type = DO_TYPE.A) {
  doReally(type);
}

/**
 * 真正地做些事情吧
 * @param type 
 */
function doReally(type: DO_TYPE){
  console.log('do type a expect type a got:', type);
}

