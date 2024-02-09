import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import storeContext from "../../context/storeContext";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
    localStorage.removeItem("crud_token");
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };
  return (
    <div className="py-2 bg-white text-center text-grat-700">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <Link to={"/"}>
          {store.userInfo ? <h2>{store.userInfo.name}</h2> : <h2>Sorry</h2>}
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link
              to={"/user/all"}
              className={`px-2 py-[4px] rounded-md ${
                pathname == "/user/all" ? "bg-sky-500 text-white" : ""
              }`}
            >
              {" "}
              My post{" "}
            </Link>
          </li>
          <li>
            <Link
              to={"/post/create"}
              className={`px-2 py-[4px] rounded-md ${
                pathname == "/post/create" ? "bg-sky-500 text-white" : ""
              }`}
            >
              Create Post
            </Link>
          </li>
          {store.userInfo ? (
            <li>
              <span className="cursor-pointer" onClick={logout}>
                Logout
              </span>
            </li>
          ) : (
            <li>
              <Link
                to={"/login"}
                className={`px-2 py-[4px] rounded-md ${
                  pathname == "/post/create" ? "bg-sky-500 text-white" : ""
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
