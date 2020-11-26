import { reactivity, effect } from "../lib/reactivity";
let person = reactivity({
  name: "郭家辉",
  age: 26,
  sex: 1,
  hobby: ["games", "sports", "singing"],
  company: [
    {
      id: 1,
      companyName: "微软",
      rate: 20.8,
    },
    {
      id: 2,
      companyName: "阿里巴巴",
      rate: 10.2,
    },
    {
      id: 3,
      companyName: "华为",
      rate: 9.2,
    },
  ],
});

// let arr = reactivity([{ id: 1 }, { id: 2 }, { id: 3 }]);

person.name = "郭家辉2号";
effect(() => {
  // console.log(effect);
  console.log("effected");
});
