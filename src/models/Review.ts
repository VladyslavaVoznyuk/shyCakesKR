import mongoose, { Schema, models } from 'mongoose';

const reviewSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || mongoose.model('Review', reviewSchema);

export default Review;
