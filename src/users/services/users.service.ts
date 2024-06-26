import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { CustomersService } from './customers.service';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  async create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const model = await newModel.save();
    delete model.password;
    return model;
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
