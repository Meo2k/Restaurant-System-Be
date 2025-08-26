import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../infrastructure/passport/local.guard";
import { CustomAuthService } from "../application/custom_auth.service";
import { Public } from "@/config/decorator/decorator";

@Controller('refresh') // operator with refresh token , access token
export class CustomAuthController {
    constructor(
        private readonly customAuthService: CustomAuthService
    ){}
    @Post('reexpose-acess-token')
    reExposeAccessToken(){}; 

    @Post('reexpose-refresh-token')
    reExposeRefreshToken(){}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
    return await this.customAuthService.loginUser(req.user);
    }
    
}