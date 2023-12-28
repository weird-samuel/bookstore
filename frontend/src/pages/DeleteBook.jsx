import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    console.log(id); // Add this line
    setLoading(true);
    axios
      .delete(`https://bookstore-peach.vercel.app/books${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          enqueueSnackbar("Book not found. It may have been deleted already.", {
            variant: "error",
          });
        } else {
          enqueueSnackbar(
            "An error occurred while deleting the book. Please try again.",
            { variant: "error" }
          );
        }
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Loader /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Be sure you want to delete this book</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
