import createHttpError from 'http-errors';
import Session from '../db/models/Session.js';
import User from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(404, 'Authorization header not found'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  try {
    const session = await Session.findOne({ accessToken: token });
    console.log('SESSION:', session);
    console.log('Token expires at:', session.accessTokenValidUntil);
    console.log('Current time:', new Date());
    console.log(
      'Token expired:',
      new Date() > new Date(session.accessTokenValidUntil),
    );
    if (!session) {
      return next(createHttpError(404, 'Session not found'));
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findById(session.userId);

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    req.user = user;
    console.log('Authenticated User:', req.user);
    next();
  } catch (error) {
    next(error);
  }
};
