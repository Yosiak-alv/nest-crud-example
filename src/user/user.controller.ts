import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{data: User[]}> {
    return { data: await this.userService.findAll() }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{message:string, data:User}> {
    return {
      message: 'User created successfully',
      data: await this.userService.create(createUserDto)
    }
  }

  @Patch(':id') //udate dto only update the fields that are passed ex if email is not passed it will not update the email
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto):Promise<{message:string, data:User}> {
    return {
      message: 'User created successfully',
      data: await this.userService.update(+id, updateUserDto)
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) :Promise<{message:string, data:User}> {
    return {
      message: 'User deleted successfully',
      data: await this.userService.remove(+id)
    }
  }
}
