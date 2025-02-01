import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import { HTTP_STATUSES } from '../constants/index.js';

export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(HTTP_STATUSES.NOT_FOUND, 'User not found');
  }
  return user;
};

export const updateUser = async (userId, payload) => {
  const rawResult = await User.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
    // upsert: true,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  const isNew = Boolean(rawResult?.lastErrorObject?.upserted);

  return {
    user: rawResult.value,
    isNew,
  };
};
