import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`https://bookstore-backend-7nf44f8rf-weird-samuel.vercel.app/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
        console.log(err);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    const validateForm = () => {
      if (!title) {
        enqueueSnackbar("Please enter a title", { variant: "error" });
        return false;
      }
      if (!author) {
        enqueueSnackbar("Please enter an author", { variant: "error" });
        return false;
      }
      if (!publishYear) {
        enqueueSnackbar("Please enter a publish year", { variant: "error" });
        return false;
      }
      return true;
    };
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    axios
      .put(
        `https://bookstore-backend-7nf44f8rf-weird-samuel.vercel.app/${id}`,
        data
      )
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"> Edit Book</h1>
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
            onClick={handleEditBook}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
