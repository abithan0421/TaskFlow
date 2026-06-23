import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Routes>

      <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Login /> }/>

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

    </Routes>
  );
}

export default App;