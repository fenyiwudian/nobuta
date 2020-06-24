import { doModuleA } from "./module-a";
import { doModuleB } from "./module-b";
import { DO_TYPE } from "./basic-types";

doModuleA();
doModuleB()

doModuleA(DO_TYPE.B);
doModuleB(DO_TYPE.A);