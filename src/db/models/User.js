import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
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
      type: String,
      default: '1500',
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

export const User = model('user', userSchema);
