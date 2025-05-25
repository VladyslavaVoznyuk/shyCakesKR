import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    slug: string;
    title: string;
    image: string;
    description: string;
    price: number;
}

const ProductSchema: Schema = new Schema<IProduct>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
