import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const navigate = useNavigate("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipcode: "",
    password: "",
  });

  const createUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:2468/user/register`,
        newUser
      );
      console.log(response.data); // Optionnel: Afficher la réponse de la requête POST
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        zipcode: "",
        password: "",
      });
      navigate("/users");
    } catch (error) {
      console.log("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Ajouter un nouvel utilisateur
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">
            Prénom :
          </label>
          <input
            type="text"
            id="firstName"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                firstName: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">
            lastName :
          </label>
          <input
            type="text"
            id="lastName"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                lastName: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email :
          </label>
          <input
            type="email"
            id="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zipcode" className="block mb-1">
            Code Postal :
          </label>
          <input
            type="number"
            id="zipcode"
            value={newUser.zipcode}
            onChange={(e) =>
              setNewUser({ ...newUser, zipcode: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-600"
        >
          Créer un utilisateur
        </button>
      </form>
    </div>
  );
}

export default UserForm;
