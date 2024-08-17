const Tour = require('../model/tourModel');
const User = require('../model/userModel');
const Booking = require('../model/bookingModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.getMyTour = catchAsync(async(req, res, next) => {
  const bookings = await Booking.find({user:req.user.id});
  const tourIds = bookings.map(el => el.tour.id);
  const tours = await Tour.find({ _id: {$in: tourIds} });
  res.status(200).render('overview',{
    title: 'My tours',
    tours
  })
}) 

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //get the data (reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name'));
  }
  //build template
  //render the data
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
}

exports.updateUserData =catchAsync(async (req, res, next) => {
  const updateduser = await User.findByIdAndUpdate(
    req.user.id,{
    name:req.body.name,
    email:req.body.email
  },{
    new:true,
    runValidators:true
  })

  res.status(200).render('account',{
    title:' Your account',
    user: updateduser
  })
})