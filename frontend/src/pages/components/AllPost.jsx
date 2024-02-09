import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import storeContext from "../../context/storeContext";
import axios from "axios";
import { base_url } from "../../utils/config";

const AllPost = () => {
  const [allPost, setAllPost] = useState([]);
  const { store } = useContext(storeContext);
  const dataByApi = async () => {
    const { data } = await axios.get(`${base_url}/api/post/all`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    setAllPost(data);
  };

  useEffect(() => {
    dataByApi();
  }, []);
  console.log(allPost);
  return (
    <div>
      <Header />
      <div className="mt-8 px-10 grid grid-cols-3 gap-10">
        {allPost.map((item) => {
          return (
            <div className="bg-white p-5">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <img src={item.image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPost;
