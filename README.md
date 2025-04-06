# Business-Messager – Customer Communication Tool

**A simple application enabling businesses to collect customer phone numbers and send messages using the Twilio API.**

## 📌 Overview

**Business-Messager** is a web-based application designed to facilitate seamless communication between businesses and their customers. It consists of two main components:

1. **Customer Interface**: A pop-up window where customers can enter their phone numbers, which are then stored in a PostgreSQL database.
2. **Host Interface**: A dashboard displaying all collected phone numbers, allowing the host to send custom messages to customers via the Twilio API.

The application is built with a **Next.js (React) frontend** and a **Node.js (Express) backend**, utilizing a **PostgreSQL database** for data storage. Currently, it operates on `localhost` and requires deployment for production use.

## 🔥 Key Features

- **Customer Phone Number Collection**: Securely collects and stores customer phone numbers through a user-friendly pop-up interface.
- **Host Dashboard**: Provides an overview of all collected phone numbers, enabling hosts to manage customer contacts efficiently.
- **Twilio API Integration**: Facilitates sending custom messages to customers directly from the host dashboard.
- **Modular Architecture**: Separates concerns with distinct `Customer` and `Host` components for scalability and maintainability.

## 🏗️ Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Messaging Service**: Twilio API

## 🛠️ Installation & Setup

### **Prerequisites**

- **Node.js** and **npm** installed on your machine.
- **PostgreSQL** database set up and running.
- **Twilio Account** with valid API credentials.

### **Clone the Repository**

```bash
git clone https://github.com/MozartofCode/Business-Messager.git
cd Business-Messager
```

### **Backend Setup**

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_postgresql_connection_string
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

3. **Initialize the Database**:

   Ensure your PostgreSQL database has a table to store customer phone numbers. You can use the following SQL command:

   ```sql
   CREATE TABLE customers (
       id SERIAL PRIMARY KEY,
       phone_number VARCHAR(15) NOT NULL
   );
   ```

4. **Start the Backend Server**:

   ```bash
   npm run server
   ```

   The server will run on `http://localhost:5000`.

### **Frontend Setup**

1. **Navigate to the `Customer` or `Host` Directory**:

   ```bash
   cd Customer
   ```

   or

   ```bash
   cd Host
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Frontend Application**:

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`.

## 🎯 How It Works

1. **Customer Interaction**:

   - Customers access the website and are presented with a pop-up window prompting them to enter their phone number.
   - Upon submission, the phone number is sent to the backend and stored securely in the PostgreSQL database.

2. **Host Interaction**:

   - Hosts log into the dashboard to view a list of all collected customer phone numbers.
   - Hosts can compose and send custom messages to selected customers using the Twilio API integration.

## 🚀 Deployment

To deploy the application for production use:

1. **Configure Environment Variables**: Ensure all necessary environment variables are set for the production environment.

2. **Database Migration**: Apply any necessary database migrations to the production database.

3. **Build the Application**:

   ```bash
   npm run build
   ```

4. **Start the Production Server**:

   ```bash
   npm run start
   ```

## 🚧 Future Enhancements

- **User Authentication**: Implement authentication and authorization for the host dashboard to ensure secure access.
- **Message Templates**: Allow hosts to create and save message templates for quick communication.
- **Analytics Dashboard**: Provide insights into message delivery status and customer engagement metrics.

## 📬 Contact

**Author**: Bertan Berker 
💻 GitHub: [MozartofCode](https://github.com/MozartofCode)
---
