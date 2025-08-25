import { ICustomAuthRepository } from "../application/custom_auth.repository";
import { RefreshToken } from "./refresh_token.schema";
import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "@/components/user/application/user.service";
import { IUserRepository } from "@/components/user/application/user.repository";
import { hashPasswordHelper } from "@/helper/util";
import { IUSER_REPOSITORY } from "@/config/constant/constant";

@Injectable()
export class CustomAuthRepositoryImp implements ICustomAuthRepository{
    constructor(
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>, 
        @Inject(IUSER_REPOSITORY) private readonly userRepo: IUserRepository
    ){}
    reExposeAccessToken: () => void;
    reExposeRefeshToken: () => void;

    async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findByEmailObject(email);
    const passwordHash = await hashPasswordHelper(pass); 
    if (user && user.getPasswordHash() === passwordHash) {
    //   const { passwordHash, ...result } = user;
    //   return result;
    }
    return null;
  }
}