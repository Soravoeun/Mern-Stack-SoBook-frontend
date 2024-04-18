// import { useState } from "react"

// const [cartItems, setCartItems] = useState ({id: 0})

// const addToCart = (id) => {
// setCartItems(cartItems => ({...cartItems, [id]: cartItems[id] + 1}))
// }


/*{
   <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {books.map((book, key) => (
                    <li key={key} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p className="ml-4">{book.title}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {book.quantity}</p>

                          <div className="flex">
                            <button
                              onClick={() => removeFromCart(book.id)}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div> 
}*/




// import { Fragment, useEffect, useState } from "react";
// import axios from "axios"; 
// import { FaTimes } from "react-icons/fa";
// import { useNavigate, useParams } from "react-router-dom"; // Importer le hook useNavigate

// import CartModal from "../components/HomeUser/CartModal";

// export default function Cart() {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate(); // Initialiser le hook useNavigate
//   const [isOpen, setIsOpen] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [removedBook, setRemovedBook] = useState([]);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleContinueShopping = () => {
//     navigate("/Books"); // Rediriger vers "/Books" lorsque le bouton "Continue Shopping" est cliqué
//   };

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     async function loadBooks() {
//       try {
//         const selectedBooks = (localStorage.getItem("books") ?? "").split(",");
//         const fetchedBooks = [];
//         for (let i = 0; i < selectedBooks.length; i++) {
//           const id = selectedBooks[i];
//           if (id !== "") {
//             axios
//               .get(`http://localhost:2468/books/oneBook/${id}`)
//               .then((dataResponse) => {
//                 const response = dataResponse.data.data;
//                 fetchedBooks.push(response);
//               });
//           }
//         }
//         console.log(fetchedBooks);
//         setBooks(fetchedBooks); // Mettre à jour l'état books avec tous les livres récupérés
//       } catch (error) {
//         console.error("Erreur lors de la récupération des livres :", error);
//       }
//     }

//     loadBooks();
//   }, []);

//   const addBookToCart = (id) => { 

//   }

//   const removeFromCart = (id) => {
//     // Supprimer l'élément spécifique du panier
//     setBooks((prevBooks) => {
//       const updatedBooks = prevBooks.filter((book) => book.id !== id);
//       return updatedBooks;
//     });

//     // Mettre à jour le stockage local
//     const storedBooks = JSON.parse(localStorage.getItem("books"));
//     const updatedStoredBooks = storedBooks.filter((bookId) => bookId !== id);
//     localStorage.setItem("books", JSON.stringify(updatedStoredBooks));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
//           <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
//             <div>
//               <h1 className="text-lg font-medium text-gray-900">
//                 Panier de Réservation
//               </h1>
//               <div className="ml-3 flex h-7 items-center">
//                 <button
//                   type="button"
//                   className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                   onClick={handleClose}
//                 >
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Close panel</span>
//                   <FaTimes className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>
//             </div>

            

//           <div className='fixed p-4 right-0 top-0 bg-blue-100 h-screen w-40'>
//               <h1 className="text-white font-bold text-2xl">Votre Panier</h1>
//               <p className='text-3xl font-bold'>Total : </p>
//               {books.map(book => {
//                 if (cartItems[book.id] > 0) {
//                   return (
//                     <div key={book.id}>
//                       <img className='w-20 h-20' src={book.image} alt={book.title}/>
//                       X <p>{cartItems[book.id]}</p>
//                       <div className='flex flex-col gap-2 font-bold'>
//                         <button>Remove</button>
//                         <button>+</button>
//                         <button>-</button>
//                       </div>
//                     </div>
//                   );
//                 }
//               })}
//             </div> 

//            </div>

//           <div className='border-t border-gray-200 px-6 py-6'>
//             <div className="flex justify-between text-base font-medium text-gray-900">
//               <p>Subtotal</p>
//               <p>{books + 1}</p>
//               <p>{books.length}</p>
//             </div>
//             <p className="mt-0.5 text-sm text-gray-500">
//               Shipping and taxes calculated at checkout.
//             </p>
//             <div className="mt-6">
//               <button
//                 data-modal-target="static-modal"
//                 data-modal-toggle="static-modal"
//                 onClick={toggleModal}
//                 className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//               >
//                 Checkout
//               </button>
//             </div>

//             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//               <p>
//                 or{" "}
//                 <button
//                   type="button"
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                   onClick={handleContinueShopping} // Utiliser la fonction handleContinueShopping pour la redirection
//                 >
//                   Continue Shopping
//                   <span aria-hidden="true"> &rarr;</span>
//                 </button>
//               </p>
//             </div>
//           </div>
//           </div>
//           </div>
//       </div>
//       <CartModal isOpen={isOpen} toggleModal={toggleModal} />
//     </div>
//   );
// } 




// import { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate, useParams } from "react-router-dom";
// import CartModal from "../components/HomeUser/CartModal";

// export default function Cart() {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [removedBook, setRemovedBook] = useState([]);
//   const [cartItems, setCartItems] = useState({});

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleContinueShopping = () => {
//     navigate("/Books");
//   };

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     async function loadBooks() {
//       try {
//         const selectedBooks = (localStorage.getItem("books") ?? "").split(",");
//         const fetchedBooks = [];
//         for (let i = 0; i < selectedBooks.length; i++) {
//           const id = selectedBooks[i];
//           if (id !== "") {
//             const response = await axios.get(
//               `http://localhost:2468/books/oneBook/${id}`
//             );

//             fetchedBooks.push(response.data.data);
//           }
//         }
//         setBooks(fetchedBooks);
//       } catch (error) {
//         console.error("Error when fetching books:", error);
//       }
//     }

//     loadBooks();
//   }, []);

//   const addToCart = (id) => {
//     setCartItems((cartItems) => ({
//       ...cartItems,
//       [id]: (cartItems[id] || 0) + 1,
//     }));
//   };

//   const subFromCart = (id) => {
//     setCartItems((cartItems) => {
//       const updatedCartItems = { ...cartItems };
//       if (updatedCartItems[id] > 0) {
//         updatedCartItems[id] -= 1;
//       }
//       return updatedCartItems;
//     });
//   };

//   const removeFromCart = (id) => {
//     setBooks((prevBooks) => {
//       const updatedBooks = prevBooks.filter((book) => book.id !== id);
//       return updatedBooks;
//     });

//     const storedBooks = JSON.parse(localStorage.getItem("books"));
//     const updatedStoredBooks = storedBooks.filter((bookId) => bookId !== id);
//     localStorage.setItem("books", JSON.stringify(updatedStoredBooks));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
//           <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
//             <div className="fixed p-4 right-0 top-0 bg-blue-100 h-screen w-100">
//               <h1 className="text-white font-bold text-2xl">Votre Panier</h1>
//               <p className="text-3xl font-bold">Total : </p>
//               {books.map((book) => {
//                 if (cartItems[book.id] > 0) {
//                   return (
//                     <div
//                       className="flex justify-between items-center"
//                       key={book.id}
//                     >
//                       <div className="flex items-center">
//                         <img
//                           className="w-20 h-20 my-4"
//                           src={book.image}
//                           alt={book.title}
//                         />
//                         X{" "}
//                         <p className="text-2xl font-bold pl-2">
//                           {cartItems[book.id]}
//                         </p>
//                       </div>
//                       <div className="flex flex-col gap-2 font-bold">
//                         <button
//                           className="text-red-500 bg-red-200 hover:bg-red-500 hover:text-white p-2 rounded"
//                           onClick={() => removeFromCart(book.id)}
//                         >
//                           Remove
//                         </button>
//                         <button
//                           className="text-green-500 text-2xl hover:text-green-700"
//                           onClick={() => addToCart(book.id)}
//                         >
//                           +
//                         </button>
//                         <button
//                           className="text-red-500 text-2xl hover:text-red-700"
//                           onClick={() => subFromCart(book.id)}
//                         >
//                           -
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 }
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//       <CartModal isOpen={isOpen} toggleModal={toggleModal} />
//     </div>
//   );
// }

/*{
   <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{books.length}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                data-modal-target="static-modal"
                data-modal-toggle="static-modal"
                onClick={toggleModal}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={handleContinueShopping} // Utiliser la fonction handleContinueShopping pour la redirection
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div> 
}*/
