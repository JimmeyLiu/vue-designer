import { customAlphabet } from "nanoid";

export function createUniqueId() {
  let id = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return "x" + id();
}
