import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../utils/config";
const Register = () => {
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
    const { data } = await axios.post(
      `${base_url}/api/auth/user/register`,
      state
    );
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen p-20">
      <div className="w-4/12 bg-white rounded-md p-10">
        <h2 className="text-center">CRUD</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="name">Name</label>
            <input
              required
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
