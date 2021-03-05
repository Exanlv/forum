import { compare } from 'bcrypt';

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
}