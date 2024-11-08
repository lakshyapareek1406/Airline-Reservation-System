

## Flight Reservation System

A complete flight reservation system built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to search for flights, book tickets, manage bookings, and make secure payments.

## Table of Contents

Features

Tech Stack

Prerequisites

Installation

Environment Variables

Running the Application

Project Structure

API Endpoints

Contributing

License


## Features

Flight Search: Search for available flights based on origin, destination, and dates.

Booking System: Book tickets and manage existing reservations.

Secure Payment: Integrated payment gateway for secure transactions.

User Authentication: Register and log in using secure authentication.

Admin Panel: Manage flights, bookings, and user accounts (admin only).

Responsive Design: User-friendly UI accessible on both desktop and mobile devices.

## Tech Stack

Frontend: React, Redux (or Context API), Tailwind CSS (optional)\

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Payment Integration: (e.g., Stripe, Razorpay, or PayPal)

Prerequisites

Node.js (v14+)

MongoDB (locally or through MongoDB Atlas)

npm or yarn


## Installation

Clone the repository:

```bash

git clone https://github.com/your-username/flight-reservation-system.git 
cd flight-reservation-system
```
Install dependencies:

```bash

# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```
## Environment Variables

Create a .env file in the backend directory.

Add the following variables:

env

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

PAYMENT_SECRET_KEY=your_payment_gateway_secret_key

## Running the Application

Start the Backend Server:

```bash
cd backend
npm start
```
Start the Frontend Development Server:

```bash

cd frontend
npm start
```
## Access the Application:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

## Project Structure
```bash
flight-reservation-system/
├── backend/
│   ├── config/         # Database and environment configuration
│   ├── controllers/    # API endpoint logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # Express server setup
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│       ├── components/ # React components
│       ├── pages/      # Page components
│       ├── services/   # API service functions
│       └── App.js      # Main application component
└── README.md           # Project README
API Endpoints
User Endpoints
POST /api/auth/register - Register a new user
POST /api/auth/login - User login
Flight Endpoints
GET /api/flights - Get all flights
POST /api/flights - Add a new flight (admin only)
PUT /api/flights/:id - Update flight information (admin only)
Booking Endpoints
POST /api/bookings - Book a flight
GET /api/bookings/:userId - Get bookings for a user
Payment Endpoints
POST /api/payments - Process a payment
Note: More endpoints can be added based on requirements.
```

## Contributing
Contributions are welcome! If you have suggestions or find bugs, feel free to open an issue or create a pull request.

## License
This project is licensed under the MIT License.
