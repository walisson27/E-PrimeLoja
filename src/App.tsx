import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage"
//import Home from "./Pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer.tsx/Footer";
import Cadastro from "./components/Users/NewUser/Cadastro";
import User from "./components/Users/User/User";
import Login from "./components/Users/Login/Login";
import Produto from "./components/Produto/Produto";
import ProdutoHome from "./Pages/ProdutoHome";
import ProdutoPage from "./Pages/ProdutoPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProdutoHome />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ProdutoPage" element={<ProdutoPage />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produto" element={<Produto />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
