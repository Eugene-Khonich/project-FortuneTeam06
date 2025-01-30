import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    volume: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Water = model('water', waterSchema);
