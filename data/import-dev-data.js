const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../model/tourModel');
const Users = require('../model/userModel');
const Review = require('../model/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Connections successfull');
});

const tours = JSON.parse(fs.readFileSync('data/tours.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('data/reviews.json', 'utf-8'));
//Import data into the database
const importData = async () => {
  try {
    await Tour.create(tours);
    await Users.create(users,{validateBeforeSave: false});
    await Review.create(reviews);
    console.log('Data successfully added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Deleting all the database into database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Users.deleteMany();
    await Review.deleteMany();
    console.log('Data sucessfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import') {
  importData();
}
