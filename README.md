# 🛍️ ShopWave — E-Commerce Product Explorer & Cart Management App

ShopWave is a production-level React application designed for a seamless online shopping experience. This project was built to demonstrate advanced React concepts, state management, and real-world backend integration as part of the **Batch 2029 React Course Final Project**.

## 🚀 Live Demo
- **Repository**: [View on GitHub](https://github.com/merugu25bcs10797-rgb/term-3-end-project-)
- **Submission ID**: PRD 4

---

## 🧐 Problem Statement
Modern shoppers need a fast, intuitive way to explore thousands of products. Building such an experience requires a robust frontend architecture that handles:
- Dynamic data fetching.
- Client-side filtering and sorting.
- Persistent shopping sessions.
- Secure user authentication.

## ✨ Core Features

### 🛒 Product Exploration
- **Real-time Explorer**: Fetches data dynamically from the FakeStore API.
- **Advanced Filters**: Filter products by category (Electronics, Jewelry, etc.) and price ranges.
- **Dynamic Sorting**: Sort products by Price (Low/High), Rating, and Newness.
- **Optimized Search**: Debounced search bar for high-performance product discovery.

### 🔐 User Authentication (Firebase)
- **Secure Sessions**: User singup and login powered by **Firebase Authentication**.
- **Protected Routes**: Secure access to the Shopping Cart and Checkout pages—only for logged-in users.
- **Session Persistence**: Users stay logged in even after refreshing the page.

### 🛍️ Cart & Wishlist Management
- **Persistent Cart**: Add, update quantities, and remove items with real-time total calculations.
- **Wishlist**: Save favorite items for later viewing.
- **Global State**: Managed via **Context API** for a reactive "app-like" experience.

### 🎨 Premium UI/UX
- **Modern Design**: Premium "Glassmorphism" design system using Vanilla CSS.
- **Fluid Animations**: Page transitions and interactive elements powered by **Framer Motion**.
- **Responsive Layout**: Optimized for Desktop, Tablet, and Mobile devices.

---

## 🛠️ Tech Stack
- **Frontend**: React 19 (Vite), React Router 7
- **Styling**: Vanilla CSS (Custom tokens & variables)
- **State Management**: React Context API
- **Backend/Auth**: Firebase
- **Form Handling**: React Hook Form + Yup (Validation)
- **Components**: Swiper (Hero Slider), React Icons, React Toastify

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/merugu25bcs10797-rgb/term-3-end-project-.git
cd term-3-end-project-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the application
```bash
npm run dev
```

---

## 🏗️ Project Structure
```text
src/
├── components/   # Atomic UI components (Navbar, ProductCard, etc.)
├── context/      # Global state providers (Auth, Cart, Wishlist)
├── hooks/        # Custom domain hooks (useProducts, useCart, etc.)
├── pages/        # Main route views
├── services/     # API and Firebase initialization
├── utils/        # Global helper functions
└── App.jsx       # Routing and provider assembly
```

---

## 🎓 Author
- **Name**: [Your Name/ID]
- **Course**: Building Web Applications with React
- **Batch**: 2029
