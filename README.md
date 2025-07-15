# Smart Parking System

A comprehensive smart parking management system with real-time booking, payment processing, and user management capabilities.

## Features

- **User Management**: Registration, authentication, and profile management
- **Parking Space Management**: Real-time availability tracking and space allocation
- **Booking System**: Reserve parking spaces with time-based scheduling
- **Payment Processing**: Integrated payment gateway for booking transactions
- **Admin Dashboard**: Comprehensive admin panel for system management
- **Real-time Notifications**: WebSocket-based notifications for booking updates
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** for database management
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend (Coming Soon)
- React.js with modern UI components
- Real-time updates via WebSocket
- Responsive design

## Project Structure

```
smart-parking/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── socket/          # WebSocket handlers
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ayush-byte-1203/Navsari_1.git
cd Navsari_1
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Parking
- `GET /api/parking/spaces` - Get all parking spaces
- `POST /api/parking/spaces` - Create new parking space (Admin)
- `PUT /api/parking/spaces/:id` - Update parking space (Admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Get payment history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Ayush - [@Ayush-byte-1203](https://github.com/Ayush-byte-1203)

Project Link: [https://github.com/Ayush-byte-1203/Navsari_1](https://github.com/Ayush-byte-1203/Navsari_1) 