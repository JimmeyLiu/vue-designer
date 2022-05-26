import { customAlphabet } from "nanoid";

export function createUniqueId() {
  let id = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return "x" + id();
}

export function mergeObject(target, source) {
  Object.keys(source).forEach((key) => {
    if (target[key] === undefined) {
      target[key] = source[key];
    }
  });
}
