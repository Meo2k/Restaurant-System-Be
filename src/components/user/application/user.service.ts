import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository';
import { hashPasswordHelper } from '@/helper/util';
import { UserDomain } from '../domain/user.domain';
import { EmailAlreadyExistsError } from '@/config/error/error';
import { IUSER_REPOSITORY } from '@/config/constant/constant';


@Injectable()
export class UserService {
  constructor(
    @Inject(IUSER_REPOSITORY)
    private readonly userRepo : IUserRepository, 
  ){}
  async registerUser(email: string , password: string): Promise<UserDomain> {
    const hashPassword = await hashPasswordHelper(password); 
    try {
      const user = await UserDomain.create(
        email, 
        hashPassword, 
        async(email : string)=> !!(await this.userRepo.findByEmailObject(email))
      );  
      return await this.userRepo.registerUser(user); 
    } catch (e) {
      if (e instanceof EmailAlreadyExistsError){
        throw new BadRequestException(e.message); 
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
