server/
├── controllers/           # Handles business logic for different features
│   ├── authController.js      # Authentication logic (login, register, verify)
│   ├── dashboardController.js # Dashboard data and statistics logic
│   ├── departmentController.js# Department management logic
│   ├── employeeController.js  # Employee management logic
│   ├── leaveController.js     # Leave management logic
│   ├── salaryController.js    # Salary management logic
│   └── settingController.js   # Application settings logic
│
├── db/
│   └── db.js             # Database connection configuration
│
├── middleware/
│   └── authMiddleware.js # Authentication middleware (token verification)
│
├── models/               # Database schemas/models
│   ├── Department.js     # Department data structure
│   ├── Employee.js       # Employee data structure
│   ├── Leave.js          # Leave application data structure
│   ├── Salary.js         # Salary data structure
│   └── User.js           # User account data structure
│
├── public/uploads/       # Storage for uploaded files
│
├── routes/              # API route definitions
│   ├── auth.js          # Authentication routes
│   ├── dashboard.js     # Dashboard routes
│   ├── department.js    # Department management routes
│   ├── employee.js      # Employee management routes
│   ├── leave.js        # Leave management routes
│   ├── salary.js       # Salary management routes
│   └── settings.js     # Settings routes
│
├── .env                # Environment variables
├── index.js           # Main application entry point
├── package-lock.json  # Dependency lock file
├── package.json      # Project configuration and dependencies
├── userSeed.js      # Initial user data seeding