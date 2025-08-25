import { Module } from '@nestjs/common';
import { UserController } from './components/user/adapter/user.controller';
import { UserService } from './components/user/application/user.service';
import { UserRepositoryImpl } from './components/user/infrastructure/user.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './components/user/infrastructure/user.schema';
import { IUSER_REPOSITORY } from './config/constant/constant';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUSER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService, IUSER_REPOSITORY]

})
export class UserModule {}
