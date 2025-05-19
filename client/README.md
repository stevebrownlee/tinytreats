# TinyTreats React Frontend

A React frontend for the TinyTreats bakery management system that integrates with the TinyTreats API from C# curriculum.

## Features

- User authentication (registration, login, logout)
- Role-based authorization (Admin, Baker, Customer)
- User profile management
- Product browsing and details view
- Shopping cart functionality for customers
- Order management for different user roles
- Responsive design for various device sizes

## Tech Stack

- React for UI components
- Vite for build tooling
- React Router for client-side routing
- Context API for state management
- Native fetch() API for backend communication
- CSS for styling

## Project Structure

```
tinytreats/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── products/
│   │   ├── profile/
│   │   ├── orders/
│   │   └── cart/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- TinyTreats API running

### Installation

1. Generate a new repo from this template to your account
2. Clone your repository
3. Navigate to the project directory
4. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:3000

## API Integration

The frontend is designed to work with the TinyTreats API from the C# curriculum. The API endpoints are:


### Authentication

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login a user |
| POST | /auth/logout | Logout a user |
| GET | /auth/me | Get current user info |

### Products
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | /products | Get all products |
| POST | /products | Create a new product _(bakers only)_ |
| GET | /products/{id} | Get a specific product |
| PUT | /products/{id} | Update details of a product |
| DELETE | /products/{id} | Remove a product |

### Orders
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | /orders | Get all orders (or user's orders for non-admin) |
| POST | /orders | Create a new order |
| PATCH | /orders/{id}/status | Update order status (Admin/Baker only) |

### Roles

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | /roles | Get all roles (Admin only) |
| POST | /roles | Create a new role (Admin only) |
| POST | /users/roles | Assign a role to a user (Admin only) |
| GET | /users/{email}/roles | Get roles for a user (Admin only) |
| DELETE | /users/{email}/roles/{roleName} | Remove a role from a user (Admin only) |

## Authentication and Authorization

The application uses cookie-based authentication with the TinyTreats API. The AuthContext provides the following:

- **isAuthenticated** - Boolean indicating if the user is authenticated
- **user** - The current user object
- **isAdmin** - Boolean indicating if the user has the Admin role
- **isBaker** - Boolean indicating if the user has the Baker role
- **login** - Function to log in a user
- **register** - Function to register a new user
- **logout** - Function to log out a user

Protected routes are implemented using the ProtectedRoute component in routes.jsx.

## Shopping Cart

The shopping cart is implemented using the CartContext and localStorage for persistence. The CartContext provides the following:

- **cartItems** - Array of items in the cart
- **addToCart** - Function to add an item to the cart
- **updateQuantity** - Function to update the quantity of an item in the cart
- **removeFromCart** - Function to remove an item from the cart
- **clearCart** - Function to clear the cart
- **getTotalPrice** - Function to get the total price of items in the cart
- **getItemCount** - Function to get the total number of items in the cart

## License

This project is licensed under the MIT License.