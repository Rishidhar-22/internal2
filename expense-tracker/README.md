# Expense Tracker App

A MERN stack application for tracking expenses with features like manual expense entry, SMS text parsing, and category filtering.

## Features

- Add expenses with date, description, amount, and category
- Smart add expenses by parsing SMS text
- Filter expenses by category
- View total expenses
- Responsive Material-UI design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
```

## Running the Application

1. Start the MongoDB server
2. Start the backend server:
```bash
cd server
npm run dev
```

3. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Manual Expense Entry**
   - Fill out the expense form with date, description, amount, and category
   - Click "Add Expense" to save

2. **Smart Add**
   - Paste SMS text into the Smart Add section
   - The app will automatically extract the amount and categorize the expense
   - Click "Smart Add" to save

3. **Viewing Expenses**
   - All expenses are displayed in a table
   - Use the category filter to view expenses by category
   - The total amount is displayed at the bottom of the table

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose 