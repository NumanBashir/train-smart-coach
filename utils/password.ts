import bcrypt from "bcryptjs";

// Hash a password with salt
export function saltAndHashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// Compare input password with hashed password
export function verifyPassword(
  inputPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}
