import { Inject, Injectable } from "@nestjs/common";
import { ICustomAuthRepository } from "./custom_auth.repository";
import { ICUSTOME_AUTH_REPOSITORY } from "@/config/constant/constant";

@Injectable()
export class CustomAuthService{
    constructor(
        @Inject(ICUSTOME_AUTH_REPOSITORY)
        private readonly customAuthRepo : ICustomAuthRepository, 

    ){}
    validateUser(email :string , password: string){
        return this.customAuthRepo.validateUser(email , password); 
    }
    reExposeRefreshToken(){}
    reExposeAccessToken(){}

}