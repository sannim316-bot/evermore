import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/home" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/leaderboard" element={<Leaderboard />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;