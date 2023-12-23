import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import PropTypes from "prop-types";

const BooksCards = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <div
          key={item._id}
          className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
        >
          <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
            {item.publishYear}
          </h2>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-2xl text-red-300" />
            <h3 className="my-1">{item.title}</h3>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-2xl text-red-300" />
            <h3 className="my-1">{item.author}</h3>
          </div>
          <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <Link to={`/books/details/${item._id}`}>
              <BsInfoCircle className="text-green-800 hover:text-black text-2xl" />
            </Link>
            <Link to={`/books/edit/${item._id}`}>
              <AiOutlineEdit className="text-yellow-600 hover:text-black text-2xl" />
            </Link>
            <Link to={`/books/delete/${item._id}`}>
              <MdOutlineDelete className="text-red-600 hover:text-black text-2xl" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

BooksCards.propTypes = {
  books: PropTypes.array,
};

export default BooksCards;
