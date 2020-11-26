import { reactivity, effect, computed } from "../lib/reactivity";

let product = reactivity({ count: 1, price: 5.0 });
// let totalPirce = computed(() => product.count * product.price);

effect(() => {
  console.log(product.count * product.price);
});

product.count = 3;
console.log(product);
// console.log(totalPirce.value);
// let arr = reactivity([{ id: 1 }, { id: 2 }, { id: 3 }]);
