import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow, BiInfoCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { PiPlusMinusFill } from "react-icons/pi";
import { useState } from "react";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
    >
      <div className="flex justify-between items-center gap-x-2">
        <div className=" top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
          <h2>{book.publishYear}</h2>
        </div>
        <div
          className="flex justify-start items-center gap-x-2"
          title="Quantité"
        >
          <PiPlusMinusFill className="text-red-300 text-2xl" />
          <h4 className="my-2 text-gray-500">{book.stock}</h4>
        </div>
      </div>

      <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border-gray-700 ">
        {/* <div className="flex justify-start items-center gap-x-2"> */}
        <div className="rounded-lg h-64 bg-gray-200 flex items-center justify-center">
          {/* <BiUserCircle className="text-red-300 text-2xl" /> */}
          {/* <h2 className="my-1">{book.image}</h2> */}
          <img
            src={book.image}
            alt={book.title}
            className="rounded-lg h-64 block mx-auto bg-slate-200 p-5" // Assurez-vous d'ajouter une classe pour centrer l'image
          />
        </div>
        <div className="p-3">
          <div
            className="flex justify-start items-center gap-x-2"
            title="Titre"
          >
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2 className="mb-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              {book.title}
            </h2>
          </div>
          <div
            className="flex justify-start items-center gap-x-2"
            title="Auteur"
          >
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="text-xs text-gray-600 dark:text-gray-300">
              {book.author}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/detail/${book._id}`}>
          <BiInfoCircle className="text-2xl text-green hover:text-black" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
