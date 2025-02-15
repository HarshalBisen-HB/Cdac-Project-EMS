# Employee Management System (EMS)

A full-stack MERN solution streamlining modern HR operations with web and mobile interfaces.
 The Employee Management System (EMS) is a full-stack MERN solution streamlining modern HR operations.
 Built with MongoDB, Express, React,React Native and Node.js, it offers a web dashboard with react for employees
 and manager and Android app with react native for employees for comprehensive workforce management. The
 system implements Container/Presentational patterns in frontend and MVC architecture in backend, secured through
 JWT authentication and role-based access. Powered by MongoDB with Mongoose ODM, EMS enables fast queries
 and flexible data handling for department management, employee records, and performance tracking. Managers
 access a feature-rich web interface for real-time oversight which integrated with Framer Motion, Lucide
 React,Tailwind CSS and syncfusion, while employees use a mobile app for profile management and request
 submissions.The system's API-first approach, comprehensive documentation with postman, and centralized state
 management ensure seamless integration.

## Overview

EMS provides comprehensive workforce management through:
- Web dashboard for managers/employees (React)
- Android mobile app for employees (React Native)
- Real-time data synchronization
- Role-based access control
- API-first architecture

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose ODM
- JWT Authentication
- MVC Architecture

### Web Frontend
- React.js
- Framer Motion
- Lucide React
- Tailwind CSS
- Syncfusion Components
- Container/Presentational Pattern

### Mobile App
- React Native
- Android Support
- JWT Authentication
- Real-time Updates

## Project Structure

### Backend (server/)
```
├── controllers/           
│   ├── authController.js      # Authentication logic
│   ├── dashboardController.js # Dashboard statistics
│   ├── departmentController.js# Department management
│   ├── employeeController.js  # Employee management
│   ├── leaveController.js     # Leave management
│   ├── salaryController.js    # Salary management
│   └── settingController.js   # System settings
├── db/
│   └── db.js             # Database configuration
├── middleware/
│   └── authMiddleware.js # Authentication middleware
├── models/               # Database schemas
│   ├── Department.js     
│   ├── Employee.js      
│   ├── Leave.js         
│   ├── Salary.js        
│   └── User.js          
├── public/uploads/      # File storage
├── routes/              # API routes
│   ├── auth.js         
│   ├── dashboard.js    
│   ├── department.js   
│   ├── employee.js     
│   ├── leave.js       
│   ├── salary.js      
│   └── settings.js    
├── .env               
├── index.js          
├── package.json     
└── userSeed.js     
```

### Web Frontend (frontend/)
```
├── src/
│   ├── assets/         # Static resources
│   ├── components/     # React components
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminSummary.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SummaryCard.jsx
│   │   ├── department/
│   │   │   ├── AddDepartment.jsx
│   │   │   ├── DepartmentList.jsx
│   │   │   └── EditDepartment.jsx
│   │   ├── employee/
│   │   │   ├── Add.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── List.jsx
│   │   │   ├── View.jsx
│   │   │   └── Table.jsx
│   │   ├── leave/
│   │   │   ├── Add.jsx
│   │   │   ├── Detail.jsx
│   │   │   └── Table.jsx
│   │   └── salary/
│   │       ├── Add.jsx
│   │       └── View.jsx
│   ├── context/
│   │   └── authContext.jsx
│   └── utils/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
```

### Mobile App (mobile/)
```
├── src/
│   ├── components/    
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Input.jsx
│   │   └── screens/
│   │       ├── Profile/
│   │       ├── Leave/
│   │       └── Salary/
│   ├── navigation/    
│   │   ├── AppStack.jsx
│   │   └── AuthStack.jsx
│   ├── services/     
│   │   └── api.js
│   └── utils/        
```

## Setup & Installation

### Backend
```bash
cd server
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Web Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Mobile App
```bash
cd mobile
npm install
npx react-native run-android
```

## Environment Variables

```env
# Backend
DB_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_secret_key
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000

# Mobile
API_URL=http://localhost:5000
```

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Secure password handling

- **Employee Management**
  - Profile management
  - Document storage
  - Performance tracking

- **Leave Management**
  - Leave application
  - Approval workflow
  - Leave balance tracking

- **Department Management**
  - Department creation/editing
  - Employee assignment
  - Department analytics

- **Salary Management**
  - Salary processing
  - Payment history
  - Tax calculations

## API Documentation

Complete Postman collection available at `/docs/api-collection.json`

## Security Features

- JWT Authentication
- Password hashing
- Input validation
- Rate limiting
- XSS protection
- CORS configuration

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License
