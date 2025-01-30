import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';

export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const updateUser = async (userId, payload) => {
  const rawResult = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
