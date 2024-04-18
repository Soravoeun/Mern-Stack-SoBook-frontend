// Axios est utilisé pour simplifier et gérer les opérations de communication HTTP entre le frontend et le backend dans les applications web modernes.
import axios from "axios";
import { useState, useEffect } from "react";
import BookSingleCard from "./BookSingleCard";

const BooksAdminCard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2468/books/all")
      .then((response) => {
        setBooks(response.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    // <div className="grid ms:frid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-8">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksAdminCard;
