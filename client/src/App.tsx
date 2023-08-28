import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Login, Register, Home } from "./pages";

function App() {
  return (
    <div className="App h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
