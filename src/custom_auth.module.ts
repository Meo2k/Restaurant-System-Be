import { Module } from "@nestjs/common";
import { CustomAuthController } from "./components/custom_auth/adapter/custom_auth.controller";
import { CustomAuthService } from "./components/custom_auth/application/custom_auth.service";
import { CustomAuthRepositoryImp } from "./components/custom_auth/infrastructure/custom_auth.repository.impl";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenSchema } from "./components/custom_auth/infrastructure/refresh_token.schema";
import { UserRepositoryImpl } from "./components/user/infrastructure/user.repository.impl";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./components/custom_auth/infrastructure/passport/local.strategy";
import { UserModule } from "./user.module";
import { ICUSTOME_AUTH_REPOSITORY, IUSER_REPOSITORY } from "./config/constant/constant";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./components/custom_auth/infrastructure/passport/jwt.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RefreshToken.name, schema: RefreshTokenSchema }
        ]),
        JwtModule.registerAsync({
          imports: [ConfigModule], 
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), // Get secret from environment variable
            signOptions: { expiresIn: '60s' }, // Example option
          }),
          inject: [ConfigService], // Inject ConfigService
        }),
        UserModule, 
        PassportModule
    ],
    controllers : [CustomAuthController], 
    providers: [
        CustomAuthService, 
        LocalStrategy, 
        JwtStrategy, 
        {
            provide: ICUSTOME_AUTH_REPOSITORY, 
            useClass : CustomAuthRepositoryImp
        }, 
    ]
})
export class CustomAuthModule {}