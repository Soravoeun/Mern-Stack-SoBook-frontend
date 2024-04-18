import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";

function DeleteUser() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const removeFromList = () => {
    axios
      .delete(`http://localhost:2468/user/delete/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((dataResponse) => {
        const response = dataResponse.data;
        if (response.status === "OK") {
          enqueueSnackbar("User deleted successfully", {
            variant: "success",
          });
          navigate("/users");
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        //   alert("An error happenned. please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete this user ?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={removeFromList}
        >
          Yes Delete it !
        </button>
      </div>
    </div>
  );
}

export default DeleteUser;
