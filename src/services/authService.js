import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { accessTokenLifetime } from '../constants/users.js';
import { randomBytes } from 'crypto';

const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifetime,
});

export const registerUser = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  const userObject = newUser.toObject ? newUser.toObject() : { ...newUser };
  const { password: _, ...userWithoutPassword } = userObject;
  return userWithoutPassword;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }
  await SessionCollection.deleteOne({ userId: user._id });
  const sessionData = createSessionData();

  return SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
