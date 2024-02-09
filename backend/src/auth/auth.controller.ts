import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/user/register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string; message: string }> {
    console.log(createUserDto);
    return await this.authService.register_user(createUserDto);
  }

  @Post('/user/login')
  @UsePipes(ValidationPipe)
 async login( @Body() createLoginDto: CreateLoginDto) : Promise<{ token: string; message: string }> {
    return await this.authService.loginInfo(createLoginDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
