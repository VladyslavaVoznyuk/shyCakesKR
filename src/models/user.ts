import  { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email: string;
    hashedPassword: string;
    image?: string;
    provider?: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    image: { type: String },
    provider: { type: String },
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
