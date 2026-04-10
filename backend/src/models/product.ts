import { model, Schema, Types } from 'mongoose';

enum Category {
  Soft = 'софт-скил',
  Hard = 'хард-скил',
  Other = 'другое',
  Additional = 'дополнительное',
  Button = 'кнопка'
}

interface IImage {
  fileName: string,
  originalName: string;
}

export interface IProduct {
  _id: Types.ObjectId;
  title: string;
  image: IImage;
  category: Category;
  description: string;
  price: number
}

const imageSchema = new Schema<IImage>({
  fileName: {
    type: String,
    required: [true, 'Не добавлен файл изображения'],
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'В названии товара должно быть хотя бы 2 символа'],
    maxlength: [30, 'Название товара не может быть длиннее 30 символов'],
    required: [true, 'Введите название товара'],
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    enum: Object.values(Category),
    required: [true, 'Не указана категория товара'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
}, { versionKey: false });

export const Product = model<IProduct>('product', productSchema);
