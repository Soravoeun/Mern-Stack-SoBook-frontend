import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

const BookModal = ({ book, onClose }) => {
  return (
    <>
      {/* Fond sombre avec effet d'ombre */}
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-40"></div>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
        >
          <AiOutlineClose
            className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
            onClick={onClose}
          />
          <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <h4 className="my-2 text-gray-500">{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>
          <p className="mt-4">Description</p>
          <p className="my-2 overflow-y-auto">{book.description}</p>
        </div>
      </div>
    </>
  );
};

export default BookModal;
