import mongoose, { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
});

export const Product = models.Product || model('Product', ProductSchema);
