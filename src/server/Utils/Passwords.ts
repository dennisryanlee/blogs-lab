import * as bcrypt from "bcrypt";

// takes a plaintext password, then salts and hashes it, and returns the encrypted password
export function generateHash(password: string): string {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

// compares a plaintext password with its hash, returning a boolean if they match
export function compareHash(password: string, hashed: string): boolean {
  return bcrypt.compareSync(password, hashed);
}

// console.log(generateHash("hunter2"));
// hunter2 => $2b$12$RSRV9yDnB6MlPQKtzr0WieDPo09vf1xyNkFfu/h7KZCzOjk6nFsYG
