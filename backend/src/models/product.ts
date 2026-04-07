import { model, Schema } from 'mongoose';

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

interface IProduct {
  title: string;
  image: IImage;
  category: Category;
  description: string;
  price: number
}

const imageSchema = new Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    enum: Object.values(Category),
    required: true,
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
});

export default model<IProduct>('product', productSchema);
