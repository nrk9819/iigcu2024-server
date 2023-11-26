import * as crypto from "crypto";

export default function generateId(length: number): string {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomBytes = crypto.randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % characters.length;
    result += characters.charAt(index);
  }

  return result;
}
