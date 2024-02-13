import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import storeContext from "../../context/storeContext";
import axios from "axios";
import { base_url } from "../../utils/config";
import { jwtDecode } from "jwt-decode";
import image from "../../preloder/preloder.gif";
import { Link } from "react-router-dom";

const AllPost = () => {
  const [allPost, setAllPost] = useState([]);
  const [loader, setLoader] = useState(false);
  const myLetestPost = [];
  allPost.reverse().map((item) => myLetestPost.push(item));
  const { store } = useContext(storeContext);
  const dataByApi = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${base_url}/api/post/me`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setAllPost(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    dataByApi();
  }, []);
  // const jwt_decoded = jwtDecode(localStorage.getItem("crud_token"));
  // console.log(localStorage.getItem("crud_token"), jwt_decoded);
  // console.log(store);
  return (
    <div>
      <Header />

      {loader ? (
        <>
          <div className="w-screen bg-white h-screen flex justify-center items-center">
            <img src={image} alt="" />
          </div>
        </>
      ) : (
        <>
          <h2 className="mt-8 px-10">My Post {`(${myLetestPost.length})`}</h2>
          <div className="mt-3 px-10 grid md:grid-cols-3 gap-4">
            {myLetestPost.map((item) => {
              return (
                <div className="bg-white p-5">
                  <img src={item.image} alt="" />
                  <div className="flex justify-between gap-2">
                    <h2 className="font-medium text-lg">{item.title}</h2>
                    {/* <h2 className="text-[10px]">{store.userInfo.name}</h2> */}
                  </div>
                  <p>{item.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/post/edit/ ${item._id}`}>
                      <div className="px-2 rounded-md border bg-[#acfae1]">
                        Update
                      </div>
                    </Link>
                    <div className="px-2 rounded-md border bg-[#faacac]">
                      Delete
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AllPost;
