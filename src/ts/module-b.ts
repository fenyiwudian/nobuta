import { DO_TYPE } from "./basic-types";


/**
 * 模块b做些事情,其实自己啥都不会做,而是交给别人做了.
 * @param type 类型
 */
export function doModuleB(type = DO_TYPE.B) {
  doReally(type)
}

/**
 * 还是让我这个小b来真正地做些事情吧
 * @param type 
 */
function doReally(type: DO_TYPE){
  console.log('do type a expect type a got:', type);
}