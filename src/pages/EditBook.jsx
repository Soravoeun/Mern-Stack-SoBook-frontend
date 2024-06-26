import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/oneBook/${id}`)
      .then((dataResponse) => {
        const response = dataResponse.data;
        if (response.status === "OK") {
          // enqueueSnackbar("Book Created successfully", {
          //   variant: "success",
          // });
          setLoading(false);
          setTitle(response.data.title);
          setAuthor(response.data.author);
          setPublishYear(response.data.publishYear);
          setImage(response.data.image);
          setStock(response.data.stock);
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happenned. please check the console");

        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      image,
      stock,
    };
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/books/update/${id}`, data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((dataResponse) => {
        const response = dataResponse.data;
        if (response.status === "OK") {
          enqueueSnackbar("Book  Edited successfully", {
            variant: "success",
          });
          navigate("/books/operations");
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please check console for details.");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
