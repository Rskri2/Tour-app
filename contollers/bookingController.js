const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../model/tourModel');
const express = require('express');
const catchAsync = require('../util/catchAsync');
const Booking = require('../model/bookingModel');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const session =await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [{
        price_data: {
            currency: 'usd',
            unit_amount: tour.price,
            product_data: {
                name:`${tour.name} Tour`,
                description: tour.summary,
                images: [],
            }
        },
        quantity: 1,
      }],
      mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`
  });
  res.status(200).json({
    status:'sucess',
    session
  })
});

exports.createBookingCheckout = catchAsync(async(req, res, next) =>{
  const {tour, user, price} = req.query;

  if(!tour && !user && !price)return next();
  await Booking.create({tour, user, price});
  res.redirect(req.originalUrl.split('?')[0]);
})

exports.getAllBooking = factory.getAll(Booking);
exports.createBooking  = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);