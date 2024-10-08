# Tour Booking Application

## Description

This is a tour booking application built using **Express** and **Node.js** with **Pug** as the template engine. Users can sign up, log in, browse available tours, make bookings, add reviews for tours and guides, and see the best-rated tours. Admins have additional privileges such as managing tours, users, and reviews via a CRUD interface.

## Features

### For Users:
- **Sign Up/Login**: Users can register an account and log in.
- **Browse Tours**: View available tours with details such as price, description, and ratings.
- **Booking**: Make bookings for tours and pay through an integrated payment system.
- **Add Reviews**: Post reviews for tours and guides after attending a tour.
- **Best Tours**: View the top-rated tours based on user reviews.

### For Admin:
- **CRUD Operations for Tours**: Admins can create, read, update, and delete tour information.
- **Manage Users**: View, add, update, or delete user information.
- **Manage Bookings**: Admins can oversee and manage user bookings.
- **Review Management**: Approve or remove reviews posted by users.

## Installation

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** (used for the database)

### Steps to Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Rskri2/Tour-app.git
   cd tour-app
2. Install the dependencies:
   ```bash
    npm install
   ```
3. Set up environment variables. Create a .env file in the root directory with the following information:
  ```bash
        NODE_ENV=development
        PORT=3000
        DATABASE=your_database_name
        DATABASE_PASSWORD=your_database_password
        JWT_SECRET= your_jwt_secret
        JWT_EXPIRES_IN=
        JWT_COOKIE_EXPIRES_IN=
   ```
4. Start the development server:
   ```bash
    nodemon index.js
   ```
5.Access the app in the browser at http://localhost:3000.
## Available Routes

### User Routes:
- `POST /signup`: Register a new user.
- `POST /login`: Login as an existing user.
- `GET /me`: View your profile.
- `PATCH /updateMe`: Update profile information.
- `DELETE /deleteMe`: Deactivate your account.

### Tour Routes:
- `GET /tours`: View all available tours.
- `GET /tour/:id`: View a specific tour.
- `POST /tours`: (Admin) Create a new tour.
- `PATCH /tours/:id`: (Admin) Update tour information.
- `DELETE /tours/:id`: (Admin) Delete a tour.

### Booking Routes:
- `POST /bookings`: Make a booking for a tour.
- `GET /my-tours`: View your booked tours.

### Review Routes:
- `POST /tours/:tourId/reviews`: Add a review for a tour.
- `GET /tours/:tourId/reviews`: View all reviews for a tour.

### Admin-Specific Routes:
- `GET /admin/users`: View all users.
- `GET /admin/tours`: View all tours.
- `GET /admin/bookings`: View all bookings.

## Tech Stack

- **Backend**: Node.js, Express
- **Templating**: Pug
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT Authentication
- **Environment Variables**: dotenv


