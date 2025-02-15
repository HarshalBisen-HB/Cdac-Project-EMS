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

## UI

Deployed the frontend on vercel:- https://cdac-project-ems-managers-aqbvcev9q-harshs-projects-f2cd1ad8.vercel.app/login

![Screenshot 2025-02-11 032026](https://github.com/user-attachments/assets/de2d6aac-2326-4c07-8f00-860366b23d4d)
![Screenshot 2025-02-11 033432](https://github.com/user-attachments/assets/bf31f0b3-9e37-488b-92ac-4d626fd070ce)
![Screenshot 2025-02-11 033249](https://github.com/user-attachments/assets/37f3795e-956b-4933-ac35-86ae2117cceb)
![Screenshot 2025-02-11 032637](https://github.com/user-attachments/assets/37bf7358-a82b-44d2-9969-ed56abb19aab)
![Screenshot 2025-02-11 032520](https://github.com/user-attachments/assets/863d3055-dd5f-49c9-b220-738a8a12094a)
![Screenshot 2025-02-11 032407](https://github.com/user-attachments/assets/d3a76f81-f096-483d-91e6-efb2033309e7)
![Screenshot 2025-02-11 032313](https://github.com/user-attachments/assets/f8b3495a-ce33-4433-bedb-33e6566028f2)
![Screenshot 2025-02-11 032116](https://github.com/user-attachments/assets/e1a835df-70dc-4851-a4c8-276c2a9f1207)


