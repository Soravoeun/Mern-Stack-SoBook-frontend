import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FiUser, FiLock, FiMail, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipcode: "",
    password: "",
    confirmPassword: "",
  });

  const createUser = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2468/user/inscription", newUser)
      .then((dataResponse) => {
        const response = dataResponse.data;
        console.log(response);
        if (response.status === "OK") {
          enqueueSnackbar("Un Utilisateur a bien créé avec succès", {
            variant: "success",
          });
          setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            zipcode: "",
            password: "",
            confirmPassword: "",
          });
          // const { token, firstName } = response.data;

          // localStorage.setItem("jwt", token);
          // localStorage.setItem("firstName", firstName); // Stocker uniquement le prénom pour l'exemple
          // localStorage.setItem("isAdmin", isAdmin);
          // console.log("USER CONNECTED", firstName);
          navigate("/connexion");
        } else {
          enqueueSnackbar(
            "Une erreur s'est produite lors de la création de l'utilisateur",
            { variant: "error" }
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Inscription
        </h2>
        <form onSubmit={createUser}>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-indigo-500 py-2">
              <FiUser className="w-6 h-6 mr-3 text-indigo-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Prénom"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-indigo-500 py-2">
              <FiUser className="w-6 h-6 mr-3 text-indigo-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Nom"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-indigo-500 py-2">
              <FiMail className="w-6 h-6 mr-3 text-indigo-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                autoComplete="username"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border-b-2 border-indigo-500 py-2">
              <FiMapPin className="w-6 h-6 mr-3 text-indigo-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="zipcode"
                placeholder="Code postale"
                value={newUser.zipcode}
                onChange={(e) =>
                  setNewUser({ ...newUser, zipcode: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-indigo-500 py-2">
              <FiLock className="w-6 h-6 mr-3 text-indigo-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                autoComplete="new-password"
                placeholder="Mot de passe"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border-b-2 border-indigo-500 py-2">
              <FiLock className="w-6 h-6 mr-3 text-indigo-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                autoComplete="new-password"
                placeholder="Confirmation Mot de passe"
                value={newUser.confirmPassword}
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Créer un utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
