export interface ICustomAuthRepository {
    reExposeRefeshToken () : void , 
    reExposeAccessToken () : void , 
    validateUser (email: string , password: string) : Promise<any>
}