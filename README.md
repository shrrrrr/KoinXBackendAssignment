# KoinX Backend Assignment

## Overview

This project implements a backend API that fetches cryptocurrency data (Bitcoin, Ethereum, Matic) every 2 hours, stores it in MongoDB, and exposes two APIs (`/stats` and `/deviation`) for querying the data.

## APIs

### 1. `/stats`

- **Description**: Fetches the latest data (price, market cap, and 24h change) of the requested cryptocurrency.
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: The cryptocurrency to fetch data for. (Options: `bitcoin`, `matic`, `ethereum`)
  
- **Sample Request**:
  ```
  GET http://localhost:5000/api/stats?coin=bitcoin
  ```

- **Sample Response**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

---

### 2. `/deviation`

- **Description**: Fetches the standard deviation of the price of the requested cryptocurrency for the last 100 records stored in the database.
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: The cryptocurrency to calculate the price deviation for. (Options: `bitcoin`, `matic`, `ethereum`)
  
- **Sample Request**:
  ```
  GET http://localhost:5000/api/deviation?coin=bitcoin
  ```

- **Sample Response**:
  ```json
  {
    "deviation": 4082.48
  }
  ```

---

## Setup and Installation

### Prerequisites

- Node.js (version 14.x or higher)
- MongoDB Atlas or a local MongoDB instance
- A MongoDB URI (add it to `.env`)

### Steps to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/shrrrrr/KoinXBackendAssignment.git
   cd KoinXBackendAssignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB URI:
   ```
   MONGO_URI=your-mongo-uri-here
   ```

4. Run the server:
   ```bash
   node app.js
   ```

5. The server will be running on `http://localhost:5000`.

---

## Technologies Used

- **Node.js**: Backend runtime environment
- **MongoDB**: Database to store cryptocurrency data
- **Cron Jobs**: To schedule periodic fetching of cryptocurrency data
- **CoinGecko API**: To fetch live cryptocurrency data

---

## Database Schema

The `cryptos` collection in MongoDB stores cryptocurrency data with the following structure:

```json
{
  "_id": ObjectId,
  "coin": String, // bitcoin, matic, ethereum
  "price": Number,
  "marketCap": Number,
  "change24h": Number,
  "timestamp": Date
}
```

---

## Notes

- The background job fetches data every 2 hours from CoinGecko and stores it in MongoDB.
- The `/stats` API retrieves the latest data for a specified cryptocurrency.
- The `/deviation` API calculates the standard deviation for the last 100 price records.

---
