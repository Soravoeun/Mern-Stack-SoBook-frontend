import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { MdShoppingCart } from "react-icons/md";
import { IoHeartCircleOutline } from "react-icons/io5";

const NavBar = () => {
  const { currentLogin, setCurrentLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const userFirstName = localStorage.getItem("firstName");
  //   console.log(firstName);

  const handleLogout = async () => {
    localStorage.clear();
    setCurrentLogin({ isAdmin: false, isConnected: false });
    navigate("/");
  };

  return (
    <header>
      <nav className="flex justify-between items-center py-4 px-8 bg-gray-800">
        {/* <h1 className="text-white text-6xl">SoBook</h1> */}
        <Link to="/" className="text-white text-4xl md:text-5xl lg:text-6xl">
          SoBook
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
          >
            Accueil
          </Link>
          <Link
            to="/books/all"
            className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
          >
            Livres
          </Link>

          {currentLogin.isAdmin && (
            <Link
              to="/users"
              className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
            >
              Utilisateurs
            </Link>
          )}

          {currentLogin.isAdmin && (
            <Link
              to="/books/operations"
              className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
            >
              Liste des livres
            </Link>
          )}
          <Link
            to="/favoris"
            className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
          >
            <IoHeartCircleOutline />
          </Link>

          {/* {!currentLogin.isAdmin && ( */}
          <Link
            to="/cart"
            className="text-white hover:underline text-sm md:text-base lg:text-lg"
          >
            <MdShoppingCart />
          </Link>
          {/* )} */}
        </div>
        <div className="flex justify-between items-center gap-2.5">
          {userFirstName ? (
            <>
              <p className="text-white text-lg md:text-xl lg:text-2xl">
                {userFirstName}
              </p>
              <Link
                to="/"
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 text-lg md:text-xl lg:text-2xl"
              >
                Déconnexion
              </Link>
            </>
          ) : (
            <Link
              to="/connexion"
              className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 text-sm md:text-base lg:text-lg"
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
