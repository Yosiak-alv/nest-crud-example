import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/shared/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({id});
    if (!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const password = await hashPassword(CreateUserDto.password);
    const user = await this.userRepository.create({...CreateUserDto, password});
    return await this.userRepository.save(user);
  }

  async update(id: number, UpdateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneBy({id});
    if (!user){
      throw new NotFoundException('User not found');
    }
    const updatedUser =  this.userRepository.merge(user, UpdateUserDto);
    return await this.userRepository.save(updatedUser);
    //return await this.userRepository.save({id, ...UpdateUserDto});
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({id});
    if (!user){
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.remove(user);
  }
}
