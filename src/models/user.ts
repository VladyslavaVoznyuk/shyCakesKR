import mongoose, { Schema, model, models, Document } from 'mongoose';

// 1. Інтерфейс для користувача
export interface IUser extends Document {
    name?: string;
    email: string;
    hashedPassword: string;
    image?: string;
    provider?: string;
}

// 2. Схема
const userSchema = new Schema<IUser>({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    image: { type: String },
    provider: { type: String },
});

// 3. Модель
const User = models.User as mongoose.Model<IUser> || model<IUser>('User', userSchema);
export default User;
