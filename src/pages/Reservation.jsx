import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoLibrary } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const fetchedBooks = [];
    try {
      const reservationBooks = await axios.get(
        "http://localhost:2468/reservation/allBooks",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        }
      );
      const reservationBooksResponse = reservationBooks.data;
      if (reservationBooksResponse.status === "OK") {
        const selectedBooks = reservationBooksResponse.data;
        let currentBook;
        let currentBookResponse;
        for (let i = 0; i < selectedBooks.length; i++) {
          const id = selectedBooks[i].book;
          if (id !== "") {
            currentBook = await axios.get(
              `http://localhost:2468/books/oneBook/${id}`
            );
            currentBookResponse = currentBook.data;
            if (currentBookResponse.status === "OK") {
              fetchedBooks.push(currentBookResponse.data);
            } else {
              navigate("/error");
            }
          }
        }
        setBooks(fetchedBooks);
      } else {
        navigate("/error");
      }

      // .then((dataResponse) => {
      //   const response = dataResponse.data;
      //   console.log(response);
      //   if (response.status === "OK") {
      //     const selectedBooks = response.data;
      //     for (let i = 0; i < selectedBooks.length; i++) {
      //       const id = selectedBooks[i].book;
      //       if (id !== "") {
      //         axios
      //           .get(`http://localhost:2468/books/oneBook/${id}`)
      //           .then((dataResponse) => {
      //             fetchedBooks.push(dataResponse.data.data);
      //           });
      //       }
      //     }
      //     setBooks(fetchedBooks);
      //   } else {
      //     navigate("/error");
      //   }
      //   //   setLoading(false);
      // })
      // .catch((error) => {
      //   //   setLoading(false);
      //   console.log(error);
      //   navigate("/error");
      // });
    } catch (error) {
      console.error("Error when fetching books:", error);
      navigate("/error");
    }
  };

  const removeBookFromReservation = async (id) => {
    // Effectuer une requête DELETE vers l'API pour supprimer le livre de la réservation
    axios
      .delete(`http://localhost:2468/reservation/delete/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((dataResponse) => {
        const response = dataResponse.data;
        // Vérifier si la requête a réussi
        console.log(response)
        if (response.status === "OK") {
          // Si la suppression est réussie, afficher un message de succès
          console.log("Book removed successfully from reservation");
          loadBooks();
        } else {
          // Si la suppression échoue, afficher un message d'erreur
          console.error("Failed to remove book from reservation");
        }
      })
      .catch((error) => {
        // En cas d'erreur lors de la requête, afficher un message d'erreur dans la console
        console.error("Error removing book from reservation:", error);
      });
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 sm:px-20 bg-gray-300 border-b border-gray-200 relative">
            <div className="flex items-center justify-between gap-2">
              <IoLibrary className="text-3xl  text-green-500" />
              <h1 className="text-3xl flex-grow">Mes livres réservés</h1>
            </div>
          </div>
          <div className="mt-8 mb-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200"></ul>
              {books.map((book, key) => (
                <li key={key} className="flex py-6 m-5">
                  <div className="h-24 w-24' flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col ">
                    <div className="flex justify-between text-base font-mediumtext-gray-900">
                      <p className="ml-4">{book.title}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {/* <button
                      onClick={() => removeBookFromReservation(book._id)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Supprimer
                    </button> */}
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
