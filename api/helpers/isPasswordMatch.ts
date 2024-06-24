import { compareSync } from "bcrypt"
export const isPasswordMatch = async (hash1: string, hash2: string): Promise<boolean>  =>
  compareSync(hash1, hash2)

