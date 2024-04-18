import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { useSnackbar } from "notistack";
import UserList from "../components/homeAdmin/UserList";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:2468/user/all");
      setUsers(response.data);
    } catch (error) {
      console.log("Erreur lors de la récupération des utilisateurs");
    }
  };



  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Liste des Utilisateurs :</h2>
      <UserList users={users} />
     
    </div>
  );
};

export default UserPage;
