const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Connections successfull');
});

const port = process.env.PORT;

process.on('unhandledException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION');
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`App running on the ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION');
  server.close(() => {
    process.exit(1);
  });
});
