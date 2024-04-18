import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock } from "react-icons/fi"; // Import des icônes de formulaire depuis react-icons
import { LoginContext } from "../App";
import ErrorPage from "./ErrorPage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { currentLogin, setCurrentLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toogleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:2468/user/login", {
        email,
        password,
      })
      .then((dataResponse) => {
        const response = dataResponse.data;
        if (response.status === "OK") {
          const { token, firstName, isAdmin } = response.data;

          localStorage.setItem("jwt", token);
          localStorage.setItem("firstName", firstName); // Stocker uniquement le prénom pour l'exemple
          localStorage.setItem("isAdmin", isAdmin);
          console.log("USER CONNECTED", firstName);

          setCurrentLogin({ isAdmin: isAdmin, isConnected: true });

          navigate(-1);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error lors du login", error.message);
        setError("Erreur de connexion 💥");
      });
  };

  return (
    // <div className="flex min-h-full bg-gray-900 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Connexion
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-gray-700"
              >
                <FiMail className="inline-block w-5 h-5 mr-3 text-gray-500" />{" "}
                {/* Icône email */}
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  <FiLock className="inline-block w-5 h-5 mr-3 text-gray-500" />{" "}
                  {/* Icône verrou */}
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a
                    href="/inscription"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Mot de Passe oublié
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  // type={showPassword ? text : password}
                  autoComplete="current-password"
                  required
                  className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <button onClick={toogleShowPassword} type="button">
                {showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passenger"}
              </button> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Connexion
              </button>
            </div>
            {error && (
              <div className="text-center text-sm text-red-500 mt-2">
                {error}
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 ">
            Pas de compte
            <a
              href="/inscription"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 p-2"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
