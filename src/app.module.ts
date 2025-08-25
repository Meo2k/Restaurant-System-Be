import { Module } from '@nestjs/common';
import { AppController } from './components/app/adapter/app.controller';
import { AppService } from './components/app/usecase/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user.module';
import { CustomAuthModule } from './custom_auth.module';


@Module({
  imports: [
    CustomAuthModule, 
    UserModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
