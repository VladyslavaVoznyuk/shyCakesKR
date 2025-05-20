import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    cartItems: [
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
