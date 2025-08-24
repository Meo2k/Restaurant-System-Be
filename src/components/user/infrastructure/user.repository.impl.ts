import { InjectModel } from "@nestjs/mongoose";
import { IUserRepository } from "../application/user.repository";
import { UserDomain } from "../domain/user.domain";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepositoryImpl implements IUserRepository{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    async findByEmail(email: string): Promise<UserDomain | null> {
        const user =  await this.userModel.findOne({email}); 
        if (!user){
            return null 
        }
        return new UserDomain(user.email, user.password); 
    }
    async findByEmailObject(email: string): Promise<UserDomain | null> {
        const user = await this.userModel.findOne({email}).lean(); 
        if (!user){
            return null 
        }
        return new UserDomain(user.email, user.password); 
    }
    async registerUser(userCreate: UserDomain): Promise<UserDomain | null> {
        const user = await this.userModel.create({
            email: userCreate.getEmail(), 
            password: userCreate.getPasswordHash(),
            isActive: userCreate.getIsActive()
        })
        if (!user){
            return null 
        }
        return new UserDomain(user.email, user.password); 
    }
}