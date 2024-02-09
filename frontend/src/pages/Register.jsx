import React, { useContext, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/config";
import { toast as some } from "react-toastify";
import toast from "react-hot-toast";
import storeContext from "../context/storeContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const naigate = useNavigate()
const {dispatch} = useContext(storeContext)
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${base_url}/api/auth/user/register`,
        state
      );
      console.log(data)
      localStorage.setItem("crud_token", data.token);
      some.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });  
      dispatch({type:"register_success", payload:{token:data.token}})
      naigate("/")
    } catch (error) {
      console.log(error)
      let err = error.response.data.message[0];
      // toast.error(error.response.data.message);
       if (err == "U") {
        some.error( error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
       } else {
        some.error( err, {
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
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen p-20">
      <div className="w-4/12 bg-white rounded-md p-10">
        <h2 className="text-center">CRUD</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="name">Name</label>
            <input
              onChange={inputHandle}
              value={state.name}
              type="text"
              name="name"
              id="name"
              placeholder="Type your name"
              className="outline-none px-4 py-[5px] border-[1px] rounded-md focus:border-sky-500 duration-300"
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={inputHandle}
              value={state.email}
              type="email"
              name="email"
              id="email"
              placeholder="Type your Email"
              className="outline-none px-4 py-[5px] border-[1px] rounded-md focus:border-sky-500 duration-300"
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="email">Password</label>
            <input
              required
              onChange={inputHandle}
              value={state.password}
              type="password"
              name="password"
              id="password"
              placeholder="Type your password"
              className="outline-none px-4 py-[5px] border-[1px] rounded-md focus:border-sky-500 duration-300"
            />
          </div>

          <button
            type="submit"
            className="btn w-full py-2 text-center bg-sky-500 rounded-md mt-4 cursor-pointer text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
