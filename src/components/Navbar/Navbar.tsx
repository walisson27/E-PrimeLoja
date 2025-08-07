import {Link} from "react-router-dom";
import "./navbar.css"


const Navbar = () => {
  return (
    <nav className="navbar ">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
       {/* <li><Link to="/contact">Contact</Link></li> */}
        <li><Link to="/produto">Cadastro de Produtos</Link></li>
        <li><Link to="/user">User</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;