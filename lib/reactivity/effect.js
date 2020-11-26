let targetMap = new WeakMap();
let effectStack = [];
let activeEffect = null;

function track(target, key) {
  console.log("track...", target, key);
  activeEffect = effectStack[effectStack.length - 1];
  if (activeEffect) {
    //结合effct->createReactiveEffect->run中effectStack入栈出栈的逻辑，
    //确保了只有通过effect回调函数中某一响应式对象的getter(而不是任意地方调用的该响应式对象的getter)，才会进行依赖的收集

    //依赖收集的过程
    let depsMap = targetMap.get(target);
    if (depsMap === undefined) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (deps === undefined) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    if (!deps.has(activeEffect)) {
      //双向的收集
      //在map中存有依赖的effect函数集合(effect[])，
      //在effct自身的deps属性中也放入effect[][]
      deps.add(activeEffect);
      activeEffect.deps.push(deps);
    }
  }
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap === undefined) {
    return;
  }
  const effects = new Set();
  const computeds = new Set();

  if (key) {
    let deps = depsMap.get(key);
    deps.forEach((effect) => {
      if (effect.computed) {
        computeds.add(effect);
      } else {
        effects.add(effect);
      }
    });
  }
  console.log("trigger...", target, key);

  effects.forEach((effect) => effect());
  computeds.forEach((effect) => effect());
}

function effect(fn, options = {}) {
  let e = createReactiveEffect(...arguments);
  if (!options.lazy) {
    //懒执行 比如computed
    e();
  }
  return e;
}

function createReactiveEffect(fn, options = {}) {
  const effect = function (...args) {
    return run(effect, fn, args);
  };
  effect.deps = [];
  effect.lazy = options.lazy;
  effect.computed = options.computed;
  return effect;
}

function run(effect, fn, args) {
  if (!effectStack.includes(effect)) {
    try {
      effectStack.push(effect);
      //fn中会触发某响应式对象的getter->track，track中取得的activeEffect则是effectStack顶部的元素
      //这样try中先push 然后执行fn，finally中再pop出去
      //确保了fn中取得的activeEffect是当前对应的最新effect
      return fn(...args);
    } finally {
      effectStack.pop();
    }
  }
}

export { track, trigger, effect };
