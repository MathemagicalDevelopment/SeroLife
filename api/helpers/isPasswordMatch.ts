import { compareSync } from "bcrypt"
export const isPasswordMatch = async (password: string, hashed: string): Promise<boolean>  =>
  compareSync(password, hashed)

