import * as authService from '../services/authService.js';

export const registerController = async (req, res) => {
  const data = await authService.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data,
  });
  console.log(data);
};
