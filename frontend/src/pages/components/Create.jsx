import React, { useState } from "react";
import Header from "./Header";
import storeContext from "../../context/storeContext";
import { useContext } from "react";
import axios from "axios";
import { base_url } from "../../utils/config";
import { toast } from "react-toastify";
const Create = () => {
  const { store } = useContext(storeContext);
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [image, setImage] = useState("");
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const imageHandler = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });

      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("image", state.image);
    try {
      const { data } = await axios.post(
        `${base_url}/api/post/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="">
      <Header />
      <div className="w-[80%] bg-white mx-auto p-10 mt-4 rounded-md">
        <h2 className="text-2xl">Create Post</h2>

        <form onSubmit={createPost}>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="title">Title</label>
            <input
              onChange={inputHandler}
              value={state.title}
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className="outline-none px-4 py-[5px] border-[1px] rounded-md focus:border-sky-500 duration-300"
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="description">Description</label>
            <textarea
              rows="10"
              onChange={inputHandler}
              value={state.description}
              name="description"
              id="description"
              placeholder="description"
              className="outline-none px-4 py-[5px] border-[1px] rounded-md focus:border-sky-500 duration-300"
            ></textarea>
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="image">Image</label>
            <input
              onChange={imageHandler}
              type="file"
              id="image"
              name="image"
              className=" py-[5px] border-[1px] w-52 px-2 rounded-md focus:border-sky-500 duration-300"
            />
          </div>

          {image && (
            <div className="">
              <img className="w-42" src={image} alt="" />
            </div>
          )}
          <button
            type="submit"
            className="btn w-full py-2 text-center bg-sky-500 rounded-md mt-4 cursor-pointer text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
