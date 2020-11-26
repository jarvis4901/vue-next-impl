import { effect } from "./effect";

function computed(fn) {
  const runner = effect(fn, { computed: true, lazy: true });
  return {
    effect: runner,
    get value() {
      return runner();
    },
  };
}

export { computed };
