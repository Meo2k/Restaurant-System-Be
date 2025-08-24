import { EmailAlreadyExistsError } from "@/config/error/error";

export class UserDomain{
    private isActive: boolean = false; 
    private username: string;  

    constructor(
        private email: string, 
        private passwordHash: string, 
    ){}

    getEmail(): string { return this.email; }
    getUserName(): string { return this.username; }
    getPasswordHash(): string { return this.passwordHash; }
    getIsActive(): boolean { return this.isActive }

    changeUserName(newUsername: string): void{
        this.username = newUsername; 
    }
    setActive(): void{
        this.isActive = true; 
    }

    static async create(
        email: string, 
        passwordHash: string,
        existEmailFn: (email: string) => Promise<boolean> 
    ){
        if (await existEmailFn(email)){
            throw new EmailAlreadyExistsError(email); 
        }
        return new UserDomain(email, passwordHash); 
    } 

    comparePassword(password: string, hashFn : (plain : string) => string): boolean{
        return this.passwordHash === hashFn(password); 
    }

    changePassword(newPassword: string): void{
        this.passwordHash = newPassword; 
    }

}