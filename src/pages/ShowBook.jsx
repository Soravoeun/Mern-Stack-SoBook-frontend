import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import ErrorPage from "./ErrorPage";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:2468/books/oneBook/${id}`)
      .then((dataResponse) => {
        const response = dataResponse.data;
        console.log(response.data);
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        <ErrorPage/>
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-6">
      <BackButton />
      <h1 className="text-3xl my-4"> Détails du livre</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Stock</span>
            <span>{book.stock}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Titre</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Auteur</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date de publication</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date de création</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date de modification</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
