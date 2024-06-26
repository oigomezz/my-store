import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async ordersByCustomer(customerId: number) {
    const customer = await this.customerModel.findOne({
      where: { id: customerId },
    });

    return this.orderModel.find({ where: { customer } });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException('not found');

    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
    });
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
