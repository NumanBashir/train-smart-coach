import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  image?: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
});

export const User = models.User || model<IUser>("User", UserSchema);
