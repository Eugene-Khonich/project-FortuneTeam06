import Water from '../db/models/Water.js';

export const addWater = async (payload) => {
  await Water.create(payload);
};

export const updateWater = async (waterId, userId, payload, options = {}) => {
  const water = await Water.findOneAndUpdate(
    { _id: waterId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return {
    data: water.value,
    isNew: Boolean(water.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (waterId, userId) => {
  const water = await Water.findOneAndDelete({ _id: waterId, userId });
  return water;
};

export const getWaterByDate = async (date, userId) => {
  const startOfDay = `${date}T00:00:00`;
  const endOfDay = `${date}T23:59:59`;
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
  const startOfMonth = `${yearMonth}-01T00:00:00`;
  const endOfMonth = `${yearMonth}-31T23:59:59`;
  const water = await Water.find({
    userId,
    drinkTime: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  });
  return water;
};
