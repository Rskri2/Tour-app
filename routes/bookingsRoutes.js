const express = require('express');
const bookingControllers = require('../contollers/bookingController');
const authController = require('../contollers/authControllers');
const factory = require('../util/handlerFactory');
const Booking = require('../model/bookingModel');
const router = express.Router();

router.get('/checkout-sesion/:tourId',authController.protect, bookingControllers.getCheckoutSession)

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingControllers.getAllBooking)
  .post(bookingControllers.createBooking);

router
  .route('/:id')
  .get(bookingControllers.getBooking)
  .patch(bookingControllers.createBooking)
  .delete(bookingControllers.deleteBooking);

module.exports = router;
