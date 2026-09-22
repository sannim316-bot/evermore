import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppShell from "./components/AppShell";
import Today from "./pages/Today";
import Moments from "./pages/Moments";
import Journey from "./pages/Journey";
import Community from "./pages/Community";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ChildSafety from "./pages/ChildSafety";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Today />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Public policy pages (URLs used in the Play Console listing) */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/child-safety" element={<ChildSafety />} />

        {/* Retired routes from the accounts version go to the app home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
