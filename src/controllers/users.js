import createHttpError from 'http-errors';
import { getUserById, updateUser } from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUpload } from '../utils/saveFileToUpload.js';
import { getEnv } from '../utils/getEnv.js';

export const getUserByIdController = async (req, res, next) => {
  const userId = req.user._id;
  const user = await getUserById(userId);

  if (!user) {
    next(createHttpError.NotFound('User not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  const userId = req.user._id;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnv('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUpload(photo);
    }
  }

  const result = await updateUser(userId, {
    ...req.body,
    avatarUrl: photoUrl,
  });

  if (!result) {
    next(createHttpError.NotFound('User not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully updated user!',
    data: result.user,
  });
};
