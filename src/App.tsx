import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage"
import Home from "./Pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer.tsx/Footer";
import Cadastro from "./components/Users/NewUser/Cadastro";
import User from "./components/Users/User/User";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
