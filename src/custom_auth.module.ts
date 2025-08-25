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

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RefreshToken.name, schema: RefreshTokenSchema }
        ]),
        UserModule, 
        PassportModule
    ],
    controllers : [CustomAuthController], 
    providers: [
        CustomAuthService, 
        LocalStrategy, 
        {
            provide: ICUSTOME_AUTH_REPOSITORY, 
            useClass : CustomAuthRepositoryImp
        }, 
    ]
})
export class CustomAuthModule {}