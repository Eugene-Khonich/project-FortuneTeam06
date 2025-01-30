import UserCollection from '../db/models/User';

export const registerUser = async (payload) => {
  return await UserCollection.create(payload);
};
