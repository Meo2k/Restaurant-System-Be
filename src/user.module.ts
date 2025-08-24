import { Module } from '@nestjs/common';
import { UserController } from './components/user/adapter/user.controller';
import { UserService } from './components/user/application/user.service';
import { UserRepositoryImpl } from './components/user/infrastructure/user.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './components/user/infrastructure/user.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: "IUserRepository",
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService]

})
export class UserModule {}
