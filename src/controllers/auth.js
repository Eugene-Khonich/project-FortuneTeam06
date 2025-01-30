import * as authService from '../services/authService.js';

export const regiserController = async (req, res) => {
  const data = await authService.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data,
  });
  console.log(data);
};
