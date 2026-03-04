# 🏁 RevRank

A full-stack web application for tracking, comparing, and ranking car performance data. Built with a **React** frontend and a **Flask + MongoDB** backend.

---

## ✨ Features

- **Garage** — View all stored cars in a clean card-based layout
- **Add Car** — Submit car performance data via a sleek form
- **Compare Cars** — Side-by-side comparison of two vehicles
- **Top Cars** — Ranked leaderboard of top-performing cars
- **Modern UI** — Dark-mode glassmorphism design with smooth animations

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, React Router v7, Axios    |
| Backend   | Python, Flask, Flask-CORS           |
| Database  | MongoDB (via PyMongo)               |
| Styling   | Vanilla CSS (glassmorphism + dark mode) |

---

## 📁 Project Structure

```
revrank/
├── backend/
│   ├── app.py              # Flask entry point
│   ├── data_base.py        # MongoDB connection
│   ├── requirements.txt
│   ├── routes/             # API route blueprints
│   ├── service/            # Business logic
│   └── utils/              # Helper utilities
└── src/
    ├── components/
    │   ├── Navbar.js
    │   ├── CarCard.js
    │   ├── AddCar.js
    │   ├── CompareCars.js
    │   └── Dashboard.js
    ├── pages/
    │   ├── HomePage.js
    │   ├── GaragePage.js
    │   ├── AddCarPage.js
    │   ├── ComparePage.js
    │   ├── TopCarsPage.js
    │   └── ViewCars.js
    ├── services/            # Axios API calls
    └── App.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.9
- A running MongoDB instance (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/revrank.git
cd revrank
```

### 2. Set Up the Backend

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/revrank
```

Start the Flask server:

```bash
python app.py
```

The backend will run at `http://localhost:5000`.

### 3. Set Up the Frontend

From the project root:

```bash
npm install
npm start
```

The app will open at `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/cars`          | Fetch all cars           |
| POST   | `/cars`          | Add a new car            |
| GET    | `/cars/top`      | Get top-performing cars  |
| GET    | `/cars/compare`  | Compare two cars         |

---

## 📦 Frontend Scripts

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm start`     | Start development server       |
| `npm run build` | Build for production           |
| `npm test`      | Run tests                      |
