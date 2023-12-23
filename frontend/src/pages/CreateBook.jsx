import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    const validateForm = () => {
      if (title.trim() === "") {
        alert("Please enter a title");
        return false;
      }
      if (author.trim() === "") {
        alert("Please enter an author");
        return false;
      }
      if (publishYear.trim() === "") {
        alert("Please enter a publish year");
        return false;
      }
      return true;
    };
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    axios
      .post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"> Create Book</h1>
      {loading ? <Loader /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            required={true}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            required={true}
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Year Published</label>
          <input
            required={true}
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <button
            className="p-2 bg-sky-800 text-white m-8 w-44"
            onClick={handleSaveBook}
          >
            Add to Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
