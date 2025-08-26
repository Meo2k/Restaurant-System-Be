const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function hashPasswordHelper (password : string): Promise<string>{
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword
}

export async function comparePasswordHelper (plain_pw: string, hash_pw: string): Promise<boolean>{
    return await bcrypt.compare(plain_pw, hash_pw); 
}