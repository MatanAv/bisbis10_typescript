import { Client, ClientConfig } from 'pg';
import config from '../config';

const clientConfig: ClientConfig = {
  host: config.db.host,
  port: Number(config.db.port),
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
};

const client = new Client(clientConfig);

client.connect((err: Error) => {
  if (err) {
    console.error('DB connection error', err.stack);
  } else {
    console.log('connected to DB');
  }
});

export default client;
