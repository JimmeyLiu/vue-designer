import { customAlphabet } from "nanoid";

export function createUniqueId(prefix) {
  let id = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return (prefix ? prefix : "x") + id();
}

export function mergeObject(target, source) {
  Object.keys(source).forEach((key) => {
    if (target[key] === undefined) {
      target[key] = source[key];
    }
  });
  return target;
}

export function getQuery() {
  let q = {};
  if (!window.location.search) {
    return q;
  }
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=", 2);
    q[pair[0]] = pair[1];
  }
  return q;
}
