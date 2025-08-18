import {Link} from "react-router-dom";


const Navbar = () => {



  return (
        <nav className="bg-gray-900 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 text-white text-lg font-bold tracking-wide">
                Minha Loja
              </div>
              <ul className="flex space-x-8">
                <li>
                  <Link to={"/"}
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/produto"} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                  >
                    Cadastro de Produtos
                  </Link>
                </li>
                <li>
                  <Link to={"/login"}
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  );
}

export default Navbar;  
