export const isObject = (target) => {
  return typeof target == "object" && target != null;
};

export const isEqual = (newVal, oldVal) => {
  return newVal === oldVal;
};
