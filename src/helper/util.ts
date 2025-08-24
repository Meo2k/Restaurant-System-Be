const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function hashPasswordHelper (password : string): Promise<string>{
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword
}