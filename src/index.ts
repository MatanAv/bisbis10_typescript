import 'dotenv/config';
import config from './config';
import client from './db/db';
import app from './config/app';

const port = config.app.port;

app.listen(port, () => {
  console.log(`Server is On at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  client.end((err: Error) => {
    if (err) {
      console.error('error during disconnection', err.stack);
    }
    process.exit();
  });
});

process.on('SIGTERM', () => {
  client.end((err: Error) => {
    if (err) {
      console.error('error during disconnection', err.stack);
    }
    process.exit();
  });
});
