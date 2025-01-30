import createHttpError from 'http-errors';
import { getUserById, updateUser } from '../services/users.js';
import { HTTP_STATUSES } from '../constants/index.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUserByIdController = async (req, res, next) => {
  const userId = req.user._id;
  const user = await getUserById(userId);

  if (!user) {
    next(createHttpError.NotFound('User not found'));
  }

  res.status(HTTP_STATUSES.OK).json({
    status: HTTP_STATUSES.OK,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  const userId = req.user._id;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const result = await updateUser(userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError.NotFound('User not found'));
    return;
  }

  res.json({
    status: HTTP_STATUSES.OK,
    message: 'Successfully updated user!',
    data: result.user,
  });
};
