import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}