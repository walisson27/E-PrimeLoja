import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage"
import Home from "./Pages/Home";
import Navbar from "./components/Navbar/navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductPage" element={<ProductPage />} />
      </Routes>
    </Router>
  )
}

export default App
