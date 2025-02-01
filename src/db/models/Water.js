import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    drinkedWater: {
      type: Number,
      required: true,
      default: 0,
    },
    drinkTime: {
      type: String,
      required: true,
      default: () => new Date().toISOString().slice(0, 16).replace('T', ' '),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WaterCollection = model('water', waterSchema);

export default WaterCollection;
