import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Login, Register } from "./pages";

function App() {
  return (
    <div className="App h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
