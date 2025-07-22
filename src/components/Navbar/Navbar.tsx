import {Link} from "react-router-dom";
import "./navbar.css"



const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Home</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/user">User</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;