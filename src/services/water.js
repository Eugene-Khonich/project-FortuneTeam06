import Water from '../db/models/Water.js';

export const addWater = async (payload) => {
  const water = await Water.create(payload);
  return water;
};

export const updateWater = async (waterId, userId, payload, options = {}) => {
  const water = await Water.findOneAndUpdate(
    { _id: waterId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );
  if (!water) {
    return null;
  }
  return {
    data: water,
    isNew: Boolean(options.upsert && !water._id),
  };
};

export const deleteWater = async (waterId, userId) => {
  const water = await Water.findOneAndDelete({ _id: waterId, userId });
  return water;
};

export const getWaterByDate = async (date, userId) => {
  const startOfDay = `${date} 00:00`;
  const endOfDay = `${date} 23:59`;
  const water = await Water.find({
    userId,
    drinkTime: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
  return water;
};

export const getMonthWater = async (yearMonth, userId) => {
  const startOfMonth = `${yearMonth}-01 00:00`;
  const endOfMonth = `${yearMonth}-31 23:59`;
  console.log(
    `Querying water data from ${startOfMonth} to ${endOfMonth} for user ${userId}`,
  );
  const water = await Water.find({
    userId,
    drinkTime: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  });
  return water;
};
