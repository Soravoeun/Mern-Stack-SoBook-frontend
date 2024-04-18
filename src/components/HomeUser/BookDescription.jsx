// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function BookDescription() {
//   const { id } = useParams();
//   const [book, setBook] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:2468/books/oneBook/${id}`)
//       .then((dataResponse) => {
//         setBook(dataResponse.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching book details:", error);
//       });
//   }, [id]);

//   const handleSubmit = () => {
//     try {
//       const currentBooks = localStorage.getItem("books")
//         ? localStorage.getItem("books").split(",")
//         : [];
//       if (!currentBooks.includes(id)) {
//         currentBooks.push(id);
//         localStorage.setItem("books", currentBooks);
//       }
//       navigate("/cart");
//     } catch (error) {
//       console.error("Error saving to cart:", error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center m-8 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full p-8 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//       <img
//         className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg"
//         src={book.image}
//         alt={book.title}
//       />
//       <div className="flex flex-col justify-between p-4 leading-normal">
//         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//           {book.title}
//         </h5>
//         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//           {book.description}
//         </p>
//         <p className="text-gray-600 dark:text-gray-300">
//           Author: {book.author}
//         </p>
//         <p className="text-gray-600 dark:text-gray-300">
//           Publish Year: {book.publishYear}
//         </p>
//         {/* <p className="text-gray-600 dark:text-gray-300">Pages: {book.page}</p> */}
//         {/* <p className="text-gray-600 dark:text-gray-300">
//           Category: {book.category}
//         </p> */}

//         <button
//           onClick={handleSubmit}
//           className="flex max-w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Réserver
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import BackButton from "../BackButton";
import ErrorPage from "../../pages/ErrorPage";

export default function BookDescription() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const { currentLogin } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(`http://localhost:2468/books/oneBook/${id}`)
      .then((dataResponse) => {
        console.log(dataResponse);
        setBook(dataResponse.data.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  const handleSubmit = () => {
    try {
      const currentBooks = localStorage.getItem("books")
        ? localStorage.getItem("books").split(",")
        : [];
      if (!currentBooks.includes(id)) {
        currentBooks.push(id);
        localStorage.setItem("books", currentBooks);
      } 
      navigate("/cart");
      // if (currentLogin.isConnected) navigate("/cart");
      // else navigate("/connexion");
    } catch (error) {
      console.error("Error saving to cart:", error.message);
    }
  };

  return (
    <div className="p-6">
      <BackButton />

      <div className="flex flex-col items-center m-8 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full p-8 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg"
          src={book.image}
          alt={book.title}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {book.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {book.description}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Author: {book.author}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Publish Year: {book.publishYear}
          </p>

          <button
            onClick={handleSubmit}
            className="flex max-w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}
