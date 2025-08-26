import { Inject, Injectable } from "@nestjs/common";
import { ICustomAuthRepository } from "./custom_auth.repository";
import { ICUSTOME_AUTH_REPOSITORY } from "@/config/constant/constant";

@Injectable()
export class CustomAuthService{
    constructor(
        @Inject(ICUSTOME_AUTH_REPOSITORY)
        private readonly customAuthRepo : ICustomAuthRepository, 

    ){}
   
    reExposeRefreshToken(){}
    reExposeAccessToken(){}
    async loginUser(user: any){
        return await this.customAuthRepo.login(user)
    }

}