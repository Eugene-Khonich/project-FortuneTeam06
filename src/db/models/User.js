import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'female',
    },
    dailyNorm: {
      type: Number,
      default: 15000,
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

<<<<<<< HEAD
const UserCollection = model('user', userSchema);

export default UserCollection;
=======
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('user', userSchema);
>>>>>>> 9e1d35886cc5f0b4ebd0a809062cabf7e01d7d4b
