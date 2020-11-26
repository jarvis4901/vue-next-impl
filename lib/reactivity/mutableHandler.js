import { isObject } from "../shared/utils/is";
import { reactivity } from "./reactivity";
import { hasProperty } from "../shared/utils";
import { isEqual } from "../shared/utils/is";
import { trigger, track } from "./effect";

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function get(target, key, receiver) {
    // console.log("响应式get:", target[key]);
    const res = Reflect.get(...arguments);

    if (isObject(res)) {
      return reactivity(res);
    }
    track(target, key);
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    // console.log("响应式set：", key + ":" + value);
    if (!hasProperty(target, key)) {
      //新增属性
      // console.log("响应式新增：" + value);
    } else if (!isEqual(value, target[key])) {
      //修改属性
      // console.log("响应式修改：" + key + ":" + value);
    }
    const result = Reflect.set(...arguments);
    trigger(target, key);
    return result;
  };
}
const mutableHandler = {
  get,
  set,
};

export { mutableHandler };
