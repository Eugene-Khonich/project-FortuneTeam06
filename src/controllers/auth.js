import { accessTokenLifetime } from '../constants/users.js';
import * as authService from '../services/authService.js';

const setupSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + accessTokenLifetime),
  });
};

export const registerController = async (req, res) => {
  const data = await authService.registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user',
    data,
  });
};

export const loginController = async (req, res) => {
  const session = await authService.loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authService.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.status(204).send();
};
