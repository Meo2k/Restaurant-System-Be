import { Controller, Post } from "@nestjs/common";

@Controller('refresh') // operator with refresh token , access token
export class CustomAuthController {
    @Post('reexpose-acess-token')
    reExposeAccessToken(){}; 

    @Post('reexpose-refresh-token')
    reExposeRefreshToken(){}
}