import { ICustomAuthRepository } from "../application/custom_auth.repository";
import { RefreshToken } from "./refresh_token.schema";
import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserRepository } from "@/components/user/application/user.repository";
import { comparePasswordHelper, hashPasswordHelper } from "@/helper/util";
import { IUSER_REPOSITORY } from "@/config/constant/constant";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CustomAuthRepositoryImp implements ICustomAuthRepository{
  constructor(
      @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>, 
      @Inject(IUSER_REPOSITORY) private readonly userRepo: IUserRepository, 
      private jwtService: JwtService
  ){}
  reExposeAccessToken: () => void;
  reExposeRefeshToken: () => void;

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findByEmailObject(email);
    const isCheck = await comparePasswordHelper(pass, user.getPasswordHash()) // check password
    if (user && isCheck) {
    //   const { passwordHash, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, email: user.email, _id : user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}