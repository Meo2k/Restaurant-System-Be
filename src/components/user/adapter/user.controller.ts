import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { LocalAuthGuard } from '@/components/custom_auth/infrastructure/passport/local.guard';
import { JwtAuthGuard } from '@/components/custom_auth/infrastructure/passport/jwt.guard';
import { Public } from '@/config/decorator/decorator';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user =  await this.userService.registerUser(createUserDto.email, createUserDto.password);
    return {
      message : "Create User successfull"
    }
  }

 
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
