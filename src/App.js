import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddCarPage from "./pages/AddCarPage";
import ComparePage from "./pages/ComparePage";
import GaragePage from "./pages/GaragePage";
import TopCarsPage from "./pages/TopCarsPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename="/RevRank">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddCarPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/garage" element={<GaragePage />} />
        <Route path="/top" element={<TopCarsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;