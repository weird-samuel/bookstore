import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCards from "../components/home/BooksCards";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        // console.log(res.data);
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between w-1/4">
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setViewType("table")}
          >
            Table
          </button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setViewType("card(s)")}
          >
            Card
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : viewType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCards books={books} />
      )}
    </div>
  );
};

export default Home;
