
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    title: String,
    image: String,
    description: String,
    slug: String,
    price: Number,
});

export const Product = models.Product || model('Product', ProductSchema);
