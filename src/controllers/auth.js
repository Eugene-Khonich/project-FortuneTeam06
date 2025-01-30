import * as authService from '../services/authService.js';

export const registerController = async (req, res) => {
  const data = await authService.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data,
  });
};

export const loginController = async (req, res) => {
  const session = await authService.loginUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    await authService.logoutUser(token);
  }

  res.status(204).send();
};
