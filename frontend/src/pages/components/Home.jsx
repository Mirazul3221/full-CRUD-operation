import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import ProtectRoute from "./ProtectRoute";
import storeContext from "../../context/storeContext";
import axios from "axios";
import { base_url } from "../../utils/config";
import img from "../../preloder/preloder.gif";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const { store } = useContext(storeContext);
  const [allPost, setAllPost] = useState([]);
  const myLetestPost = [];
  allPost.reverse().map((item) => myLetestPost.push(item));
  console.log(allPost);

  const dataByApi = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${base_url}/api/post/all`, {
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
  return (
    <div className="">
      {loader ? (
        <>
          <div className="flex w-screen h-screen justify-center items-center bg-white">
            <img src={img} alt="" />
          </div>
        </>
      ) : (
        <>
          <Header />
          <ProtectRoute />
          <h2 className="mt-8 px-10">All Users Posts</h2>
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
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
