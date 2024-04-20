import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { MdShoppingCart } from "react-icons/md";
import { IoHeartCircleOutline } from "react-icons/io5";
import { GiSpellBook } from "react-icons/gi";

const NavBar = () => {
  const { currentLogin, setCurrentLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userFirstName = localStorage.getItem("firstName");
  //   console.log(firstName);

  const handleLogout = async () => {
    localStorage.clear();
    setCurrentLogin({ isAdmin: false, isConnected: false });
    navigate("/");
  };

  return (
    <header>
      <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class=" flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="text-white text-3xl md:text-4xl lg:text-6xl">
            SoBook
          </Link>

          <div class="flex justify-end  md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className=" w-full  md:flex items-center justify-center md:space-x-2 lg:space-x-4 xl:space-x-5 flex gap-2">
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
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "" : "hidden"
            }`}
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  to="/"
                  className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  to="/books/all"
                  className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
                >
                  Livres
                </Link>
              </li>
              {currentLogin.isAdmin && (
                <li>
                  <Link
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    to="/books/operations"
                    className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
                  >
                    Livres Admin
                  </Link>
                </li>
              )}
              {currentLogin.isAdmin && (
                <li>
                  <Link
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    to="/users"
                    className="text-white hover:underline text-lg md:text-xl lg:text-2xl"
                  >
                    Utilisateurs
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
