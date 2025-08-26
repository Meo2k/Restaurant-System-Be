
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ICUSTOME_AUTH_REPOSITORY } from '@/config/constant/constant';
import { ICustomAuthRepository } from '../../application/custom_auth.repository';
import { UserDomain } from '@/components/user/domain/user.domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ICUSTOME_AUTH_REPOSITORY)
    private readonly customAuthRepo : ICustomAuthRepository, 
) {
    super({
          usernameField: 'email', // Specify 'email' as the field for the username
        });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.customAuthRepo.validateUser(email, password) as unknown as UserDomain;
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email : user.getEmail(), 
      username: user.getUserName(), 
      isActive : user.getIsActive(), 
    };
  }
}
