import mongoose from 'mongoose';
import { getEnv } from '../utils/getEnv.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnv('MONGODB_USER');
    const pwd = getEnv('MONGODB_PASSWORD');
    const url = getEnv('MONGODB_URL');
    const db = getEnv('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
