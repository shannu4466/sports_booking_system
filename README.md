# Sports Facility Booking System (Full-Stack Project)

A complete full-stack sports facility booking system that supports multi-resource scheduling, dynamic pricing, equipment rentals, coach bookings, role-based authentication, and a powerful Admin Dashboard.

Built with:
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MySQL
- Authentication: JWT (JSON Web Token)

---

## Key Features

### User Features
- User Registration and Login
- View available courts
- Book courts with:
  - Time slot selection
  - Optional coach selection
  - Multiple equipment rentals
- Live price preview before booking
- Dynamic pricing based on:
  - Court price
  - Time-based rules (peak, weekend, etc.)
  - Equipment rental prices
  - Coach prices
- View personal booking history
- Cancel bookings

---

### Admin Features
- Admin Login
- Manage Courts (Add, View, Delete)
- Manage Coaches (Add, View, Delete)
- Manage Equipment:
  - Stock quantity
  - Rental price
- Manage Dynamic Pricing Rules
- View All Bookings with:
  - User names
  - Court names
  - Coach names
- Cancel any booking
- Full revenue control via system pricing configuration

---

### System Capabilities
- Multi-resource availability check:
  - Court availability
  - Coach availability
  - Equipment stock validation
- On-demand dynamic price engine
- Court price fetched directly from database
- Equipment price fetched directly from database
- Coach price fetched directly from database
- JWT-based role authentication (user vs admin)
- Secure protected routes
- Fully responsive UI using Tailwind CSS

---

## Project Structure

```
sports-booking-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.js
│       └── index.js
│
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Authentication | JWT |
| API Client | Axios |

---

## Authentication and Roles

| Role | Access |
|------|--------|
| User | Can book courts and view own bookings |
| Admin | Full system control |

JWT token is stored in local storage and automatically attached to protected API requests.

---

## Database Tables

- Users
- Courts
- Coaches
- Equipment
- PricingRules
- Bookings

---

## Core API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Courts
- GET /api/courts
- POST /api/courts (Admin)

### Coaches
- GET /api/coaches
- POST /api/coaches (Admin)

### Equipment
- GET /api/equipment/available
- POST /api/equipment (Admin)

### Bookings
- POST /api/bookings
- POST /api/bookings/preview
- GET /api/bookings/my
- PUT /api/bookings/cancel/:id
- GET /api/bookings (Admin)

---

## Live Price Calculation Logic

Final booking price is calculated as:

```
Final Price =
Court Price (from database)
+ Pricing Rules Adjustment
+ Equipment Rental Total
+ Coach Fee (if selected)
```

No hard-coded pricing is used. All prices are controlled by the Admin through the database.

---

## Tailwind CSS UI

The user interface is fully styled using Tailwind CSS v3 and supports:

- Responsive layouts
- Booking page animations
- Admin dashboard UI panels
- Clean and modern form design

---

## How to Run the Project Locally

### Backend Setup

```bash
cd backend
npm install
nodemon server.js
```

Configure your `.env` file:

```
DB_NAME=sports_booking
DB_USER=root
DB_PASS=yourpassword
JWT_SECRET=yourjwtsecret
```

Ensure that MySQL is running before starting the server.

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Sample Admin Credentials (For Testing)

```
Email: admin@test.com
Password: admin123
```

---

## Sample User Credentials (For Testing)

```
Email: user@test.com
Password: user123
```

---

## Final Capabilities Summary

- Full multi-resource reservation system
- Live dynamic pricing
- Equipment rental pricing system
- Coach selection with price
- Admin control panel
- Role-based UI redirection
- Secure token-based backend
- Professional responsive UI

---

## Future Enhancements

- Online payment gateway integration
- Booking revenue analytics
- Weekly and monthly booking reports
- Email notification system
- Mobile application using React Native

---
