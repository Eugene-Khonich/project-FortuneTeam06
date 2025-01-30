import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const boostrap = async () => {
  await initMongoConnection();
  setupServer();
};

void boostrap();
