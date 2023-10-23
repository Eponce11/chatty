import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Login, Register, Home } from "./pages";
import RequireAuth from "./common/components/RequireAuth";

function App() {
  return (
    <div className="App h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
