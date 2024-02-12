import React, { useContext, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/config";
import { toast } from "react-toastify";
import storeContext from "../context/storeContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const naigate = useNavigate();
  const { dispatch } = useContext(storeContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [lodre, setLoder] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      setLoder(true);
      const { data } = await axios.post(
        `${base_url}/api/auth/user/login`,
        state
      );
      setLoder(false);
      console.log(data);
      localStorage.setItem("crud_token", data.token);
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

      dispatch({ type: "login_success", payload: { token: data.token } });
      naigate("/");
    } catch (error) {
      setLoder(false);
      // toast.error(error.response.data.message);
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
    <div className="flex justify-center items-center w-screen h-screen p-20">
      <div className="md:w-4/12 bg-white rounded-md p-10 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-sky-500 mb-3">
          My Book
        </h2>
        <form onSubmit={handleSubmit}>
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

          <div className="flex gap-5">
            <button
              disabled={lodre}
              type="submit"
              className="btn w-full py-2 text-center bg-sky-500 rounded-md mt-4 cursor-pointer text-white"
            >
              {lodre ? "Loading..." : "Login"}
            </button>
            <Link
              to={"/register"}
              className="btn w-full py-2 text-center bg-sky-500 rounded-md mt-4 cursor-pointer text-white"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
