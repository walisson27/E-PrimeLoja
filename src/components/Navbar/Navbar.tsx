import {Link} from "react-router-dom";
import { usuarioAtual,logout } from "../../utils/auth";
import "./navbar.css"


const Navbar = () => {
  const userLogin = usuarioAtual();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };


  return (
    <nav className="navbar ">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
       {/* <li><Link to="/contact">Contact</Link></li> */}
        <li><Link to="/produto">Cadastro de Produtos</Link></li>
        { userLogin ? (
          <>
            <li><span>Olá,{userLogin}</span></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;