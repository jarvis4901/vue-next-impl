import { isObject } from "../shared/utils/is";
import { mutableHandler } from "./mutableHandler";

function reactivity(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  if (!isObject(target)) {
    return target;
  }

  const observe = new Proxy(target, mutableHandler);
  return observe;
}
export { reactivity };
