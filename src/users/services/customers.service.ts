import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return this.customerModel.findById(id);
  }

  create(data: CreateCustomerDto) {
    console.log(data);
    const newModel = new this.customerModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    const customer = this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
