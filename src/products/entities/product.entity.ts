import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
