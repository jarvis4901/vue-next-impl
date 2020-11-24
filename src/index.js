import { reactivity } from "../lib/reactivity";

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

// // person.name = "郭家辉2号";
// person.company.push({ id: 4, companyName: "腾讯", rate: 1.2 });
person.company[0].id = 2;
// person.company[0].assets = 200;
