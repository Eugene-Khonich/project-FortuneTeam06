import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

export const getUserById = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const updateUser = async (userId, payload) => {
  const rawResult = await UserCollection.findByIdAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      // upsert: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  const isNew = Boolean(rawResult?.lastErrorObject?.upserted);

  return {
    user: rawResult.value,
    isNew,
  };
};

export const countUsers = async () => {
  return UserCollection.countDocuments();
};
