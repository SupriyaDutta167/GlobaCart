# 🛒 GlobaCart E-Commerce Platform

GlobaCart is a modern, full-stack e-commerce application built with a Java Spring Boot backend and a React frontend. It features user and seller roles, product management, a persistent shopping cart, and an AI-powered chatbot for customer assistance.

## ✨ Features

* **Dual User Roles:** Separate registration and login for **Customers** (browsing, buying) and **Sellers** (managing products).
* **Product Management (Seller):** Sellers can add, view, update, and delete their own products.
* **Product Browsing (Customer):** Customers can view all products, filter by category, and see detailed product pages.
* **Persistent Shopping Cart:** Database-backed cart that syncs across user sessions.
* **Order & Checkout:** Customers can place orders from their cart, which are then saved to their order history.
* **AI Chatbot:** A "Retrieval-Augmented Generation" (RAG) chatbot, powered by the **Gemini API** and **Spring AI**, that can answer user questions about product availability and pricing based on live database information.
* **Session-Based Authentication:** Secure session management using Spring Security.

## 🛠️ Technologies Used

### Backend (Java / Spring Boot)

* **Spring Boot:** The core framework for building the robust, enterprise-grade REST API.
* **Spring Security:** Handles session-based authentication and endpoint authorization.
* **Spring Data JPA (Hibernate):** Used for Object-Relational Mapping (ORM) to interact with the database using simple Java objects.
* **Spring AI (Gemini Integration):** Powers the RAG chatbot by connecting to the Gemini API and augmenting prompts with live product data.
* **Maven:** Manages all backend dependencies and the project build lifecycle.

### Frontend (React)

* **React (with Vite):** A fast, modern JavaScript library for building the component-based, reactive user interface.
* **React Router:** Manages all client-side routing and navigation (e.g., `/products`, `/cart`, `/login`).
* **React Context API:** Used for global state management, specifically for the `AuthContext` (to know who is logged in) and `CartContext` (to manage the cart state).
* **Axios:** A promise-based HTTP client used to send all API requests from the frontend to the backend.

### Database

* **MySQL:** The relational database used to store all persistent data, including users, products, cart items, and orders.

---

## 🚀 Setup and Installation

Follow these instructions to get the GlobaCart application running on your local machine for development and testing.

### ✅ Prerequisites

Before you begin, ensure you have the following software installed on your system:

* **Java JDK 21** (or newer)
* **Apache Maven**
* **MySQL Server**
* **Node.js** (v18 or newer)
* **Google AI Studio API Key** (for the chatbot feature)

---

### 🛢️ 1. Database Setup (MySQL)

You must create the database and its tables before running the backend.

1.  **Start your MySQL server.**
2.  **Create the database:** Log in to your MySQL client (like `mysql -u root -p`) and run:
    ```sql
    CREATE DATABASE globacart_db;
    ```
3.  **Run the schema script:** Use the provided `schema.sql` file to create all the necessary tables.
    ```bash
    # From the project's root directory:
    mysql -u root -p globacart_db < database/schema.sql
    ```
4.  **(Optional) Seed the database:** To add initial sample data, run the `seed.sql` script.
    ```bash
    # From the project's root directory:
    mysql -u root -p globacart_db < database/seed.sql
    ```

---

### ☕ 2. Backend Setup (Spring Boot)

The backend server connects to your database and provides the API.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Configure the application:** Open the `backend/src/main/resources/application.properties` file.
    * Update the MySQL username and password to match your local setup:
        ```properties
        spring.datasource.username=your_mysql_username
        spring.datasource.password=your_mysql_password
        ```
    * Add your Gemini API Key (get one from [Google AI Studio](https://aistudio.google.com/)):
        ```properties
        spring.ai.gemini.api-key=YOUR_GEMINI_API_KEY_GOES_HERE
        ```
3.  **Install dependencies:** Maven will download all the project libraries.
    ```bash
    mvn clean install
    ```
4.  **Run the backend server:**
    ```bash
    mvn spring-boot:run
    ```

✅ The backend server should now be running at **`http://localhost:8080`**.

---

### ⚛️ 3. Frontend Setup (React + Vite)

The frontend provides the user interface for the application.

1.  **Open a new terminal window.**
2.  **Navigate to the frontend directory:**
    ```bash
    # From the project's root directory
    cd frontend
    ```
3.  **Install dependencies:** NPM will download all the React libraries.
    ```bash
    npm install
    ```
4.  **Run the frontend dev server:**
    ```bash
    npm run dev
    ```

✅ The frontend application should now be running at **`http://localhost:5173`**.

---

### 🎉 You're all set!

Open **`http://localhost:5173`** in your browser to use the GlobaCart application.