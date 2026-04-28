import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTransmittal from "./pages/CreateTransmittal";
import Records from "./pages/Records";
import Preview from "./pages/PreviewModal";
import Verify from "./pages/Verify"; // ADD THIS

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/verify" element={<Verify />} /> {/* ADD THIS */}

        {/* PRIVATE / SYSTEM PAGES */}
        <Route
          path="*"
          element={
            <>
              <Navbar />

              <div className="p-6">
                <Routes>
                  <Route path="/home" element={<Dashboard />} />
                  <Route path="/create" element={<CreateTransmittal />} />
                  <Route path="/records" element={<Records />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}