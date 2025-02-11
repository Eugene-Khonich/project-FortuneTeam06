import createHttpError from 'http-errors';
import { accessTokenLifetime } from '../constants/users.js';
import * as authService from '../services/authService.js';
import SessionCollection from '../db/models/Session.js';

// const isSecure =
//   process.env.NODE_ENV === 'production' || req.protocol === 'https';
// const setupSession = (req, res, session) => {
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production' || req.protocol === 'https',
//     sameSite: 'None',
//     path: '/',
//     expires: new Date(Date.now() + accessTokenLifetime),
//   });
//   console.log('🔹 Cookie встановлена:', res.getHeaders()['set-cookie']);
// };

export const registerController = async (req, res) => {
  const user = await authService.registerUser(req.body);
  const session = await authService.loginUser(req.body);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || req.protocol === 'https',
    sameSite: 'None',
    path: '/',
    expires: new Date(Date.now() + accessTokenLifetime),
  });
  console.log('🔹 Cookie встановлена:', res.getHeaders()['set-cookie']);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    user,
  });
};

export const loginController = async (req, res) => {
  const session = await authService.loginUser(req.body);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || req.protocol === 'https',
    sameSite: 'None',
    path: '/',
    expires: new Date(Date.now() + accessTokenLifetime),
  });
  console.log('🔹 Cookie встановлена:', res.getHeaders()['set-cookie']);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const logoutUserController = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    throw createHttpError(401, 'Unauthorized');
  }

  await authService.logoutUser(sessionId);

  res.clearCookie('sessionId');

  res.status(204).send();
};

export const changePasswordController = async (req, res) => {
  console.log('User in controller:', req.user);
  const { oldPassword, newPassword } = req.body;
  const sessionId = req.cookies.sessionId;
  console.log('Отримані дані:', { oldPassword, newPassword, sessionId });
  if (!sessionId) {
    throw createHttpError(401, 'Unauthorized');
  }

  const session = await SessionCollection.findById(sessionId);

  if (!session) {
    throw createHttpError(401, 'Invalid session');
  }

  if (!oldPassword || !newPassword) {
    throw createHttpError(400, 'Old and new password are required');
  }

  await authService.changePassword(session.userId, oldPassword, newPassword);

  res.status(200).json({ status: 200, message: 'Password changed!', data: {} });
};
