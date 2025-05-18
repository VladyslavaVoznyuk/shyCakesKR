import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    hashedPassword: String,
    image: String,
    provider: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
