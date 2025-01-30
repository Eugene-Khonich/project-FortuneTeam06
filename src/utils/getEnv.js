import 'dotenv/config';

export const getEnv = (name, defaultValue) => {
  const value = process.env[name];

  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`Missing ${name} enviroment variable`);
};
