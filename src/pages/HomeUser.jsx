// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { MdOutlineAddBox } from "react-icons/md";
// import BooksAdminList from "../components/homeAdmin/BooksAdminList";

// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import BooksUserCard from "../components/homeAdmin/BookUserCard";

// const HomeUser = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:2468/books/all?sortBy=createdAt&order=desc&limit=5")
//       .then((dataResponse) => {
//         const response = dataResponse.data;
//         console.log(response.data);
//         setBooks(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="flex justify-between items-center gap-x-4">
//         <h1 className="text-3xl my-8">Les Nouveautés</h1>
//         <MdOutlineAddBox className="text-4xl text-blue-500 cursor-pointer" />
//       </div>
//       {loading ? <Spinner /> : <BooksUserCard books={books} />}
//     </div>
//   );
// };

// export default HomeUser;


import React, { useState } from "react";
import BooksUserCard from "../components/homeAdmin/BookUserCard";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";

const HomeUser = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center gap-x-4">
        <div>
          <h1 className="text-3xl my-8 m-8">Les Nouveautés</h1>
        </div>
        {/* <SearchBar setBooks={setBooks} /> */}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <BooksUserCard />
      )}
    </div>
  );
};

export default HomeUser;
