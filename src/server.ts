import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import seedAdminOnDatabase from './app/admin';
import fs from 'fs';
import https from 'https';

let server: Server;

const httpsOptions = {
  key: fs.readFileSync('./certs/localhost-key.pem'),
  cert: fs.readFileSync('./certs/localhost.pem'),
};

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Create admin
    seedAdminOnDatabase();

    // server = app.listen(config.port, () => {
    //   console.log(`The laivaly server is running on port ${config.port}`);
    // });

    server = https.createServer(httpsOptions, app).listen(config.port, () => {
      console.log(
        `The Laivaly server is running on https://localhost:${config.port}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection is detected, shutting down ...`, err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
