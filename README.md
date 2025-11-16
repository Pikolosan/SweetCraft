# SugarCraft - Sweet Shop Application

A full-stack web application for managing and purchasing delicious sweets, built with Node.js, Express, MongoDB, and EJS templating.

**Video** : [Drive Link](https://drive.google.com/file/d/1EK-6Z4ubRwVfAtuK4i-iOkPLb-ZsVbyX/view?usp=sharing)

---

## 🚀 Features

### **User Features**
- **Browse Sweets:** Explore a wide variety of sweets by category (Chocolate, Candy, Baked, Traditional, Sugar-Free, International)
- **User Authentication:** Secure signup and login system
- **Purchase System:** Add sweets to cart and complete purchases
- **Purchase History:** View your past purchases
- **Reviews & Ratings:** Leave reviews and ratings for sweets

### **Admin Features**
- **Admin Dashboard:** Special admin panel for managing sweets
- **Add New Sweets:** Create new sweet listings with images, ingredients, and allergen information
- **Inventory Management:** Restock and manage sweet quantities
- **Edit/Delete:** Modify or remove sweet listings

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Frontend:** EJS templating, Bootstrap CSS  
- **Authentication:** Passport.js (Local Strategy)  
- **File Upload:** Cloudinary for image storage  
- **Session Management:** express-session  

---

## 📦 Installation

### **1. Clone the repository**
```
git clone <repository-url>
cd Sweetshop
```
### **2. Install dependencies**
```
npm install
```
### **3. Environment Setup**
Create a .env file in the root directory:
```
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

### **4. Start the application**
```
node app.js
```

The application will run on: http://localhost:8080

## 🗂️ Project Structure
```
Sweetshop/
├── models/                 # MongoDB models
│   ├── Sweet.js            # Sweet schema
│   ├── user.js             # User schema
│   ├── review.js           # Review schema
│   └── Purchase.js         # Purchase schema
├── controllers/            # Route controllers
│   ├── sweets.js           # Sweet-related logic
│   └── purchases.js        # Purchase-related logic
├── routes/                 # Express routes
│   ├── sweets.js           # Sweet routes
│   ├── review.js           # Review routes
│   ├── user.js             # User authentication routes
│   └── purchases.js        # Purchase routes
├── views/                  # EJS templates
│   ├── sweets/             # Sweet-related views
│   ├── layouts/            # Layout templates
│   └── partials/           # Reusable components
├── public/                 # Static assets
│   └── images/             # Images and icons
├── middleware.js           # Custom middleware
├── schema.js               # Joi validation schemas
└── app.js                  # Main application file
```

## 🎯 Key Functionalities
## Sweet Management
- CRUD operations

- Image upload with Cloudinary

- Categorization by sweet type

- Real-time inventory tracking

## User System

- Secure registration & login

- Admin privileges

- Persistent login sessions

## Purchase System

- Add items to cart

- Maintain purchase history

- Automatic stock adjustment

## Review System

- 1–5 star rating system

- User reviews and comments

- User-controlled review deletion

## 🔐 Admin Access

Default admin email:
```
admin@SweetCraft.com
```

### Admin users can:

- Add sweet listings

- Edit/delete sweets

- Restock inventory

- Access admin dashboard

### 🎨 UI/UX Features

- Responsive Bootstrap design

- Category filters

- Search functionality

- Clean, centered navigation

- Optimized images

## 📝 API Routes
### Sweet Routes
```
GET    /sweets               - Browse all sweets
GET    /sweets/new           - Add new sweet (admin)
POST   /sweets               - Create sweet (admin)
GET    /sweets/:id           - View sweet details
GET    /sweets/:id/edit      - Edit sweet (admin/owner)
PUT    /sweets/:id           - Update sweet
DELETE /sweets/:id           - Delete sweet
GET    /sweets/my-purchases  - User purchase history
```
### User Routes
```
GET  /signup   - User registration
GET  /login    - User login
POST /logout   - User logout
```
## 🚦 Getting Started

**1. Set up MongoDB**

**2. Configure Cloudinary**

**3. Add environment variables**

**4. Start the server using node app.js**

**5. Register a user or log in as admin**

**6. Begin adding & managing sweets!**