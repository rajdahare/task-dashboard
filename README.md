# Frontend Developer Intern Assignment

A scalable MERN stack web application with authentication and dashboard features, built for the Frontend Developer Intern position.

## 🚀 Features

### Frontend (React.js)
- ✅ Responsive design using TailwindCSS
- ✅ Forms with client-side and server-side validation
- ✅ Protected routes (login required for dashboard)
- ✅ Modern UI/UX with smooth interactions

### Backend (Node.js/Express)
- ✅ JWT-based authentication (signup/login)
- ✅ Profile fetching/updating APIs
- ✅ CRUD operations on Tasks entity
- ✅ MongoDB database connection
- ✅ Password hashing with bcrypt
- ✅ JWT authentication middleware
- ✅ Comprehensive error handling & validation
- ✅ MVC architecture for scalability

### Dashboard Features
- ✅ User profile display and editing
- ✅ Task CRUD operations
- ✅ Search and filter functionality
- ✅ Logout flow

## 📁 Project Structure

```
.
├── backend/
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── taskController.js
│   ├── middleware/           # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/               # Database models
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/               # API routes
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── PrivateRoute.js
│   │   │   ├── ProfileCard.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── SearchAndFilter.js
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.js
│   │   ├── pages/            # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/frontend_intern_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Profile
- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected, supports query params: search, status, priority, sort)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create new task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

### Health Check
- `GET /api/health` - Server health check

## 🔐 Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs before storing
2. **JWT Authentication**: Secure token-based authentication
3. **Protected Routes**: Middleware to protect sensitive endpoints
4. **Input Validation**: Both client-side and server-side validation
5. **Error Handling**: Comprehensive error handling with appropriate status codes

## 🎨 UI/UX Features

- Responsive design that works on all devices
- Modern gradient backgrounds
- Smooth transitions and hover effects
- Toast notifications for user feedback
- Loading states for better UX
- Form validation with real-time error messages

## 📈 Scalability Considerations

### Backend
- MVC architecture for separation of concerns
- Modular route handlers
- Reusable middleware
- Database indexing for performance
- Environment-based configuration

### Frontend
- Component-based architecture
- Context API for state management
- Reusable components
- Optimized API calls
- Error boundaries (can be added)

### Production Recommendations
1. Add environment variables for API URLs
2. Implement rate limiting
3. Add request logging
4. Set up CORS properly for production
5. Use HTTPS in production
6. Add database connection pooling
7. Implement caching strategies
8. Add unit and integration tests
9. Set up CI/CD pipeline
10. Use environment-specific configurations

## 🧪 Testing the Application

1. **Register a new user**: Navigate to `/register` and create an account
2. **Login**: Use your credentials to login at `/login`
3. **Dashboard**: After login, you'll be redirected to the dashboard
4. **Create Tasks**: Click "New Task" to create tasks
5. **Edit/Delete Tasks**: Use the Edit and Delete buttons on each task
6. **Search & Filter**: Use the search bar and filters to find specific tasks
7. **Update Profile**: Click "Edit" on the profile card to update your information
8. **Logout**: Click the logout button to sign out
