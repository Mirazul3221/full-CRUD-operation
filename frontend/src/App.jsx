import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import Create from "./pages/components/Create";
import Update from "./pages/components/Update";
import View from "./pages/components/View";
import AllPost from "./pages/components/AllPost";
import Main from "./practice/Main";
import ProtectRoute from "./pages/components/ProtectRoute";

export default function App() {
  return (
    <div className="min-h-screen min-w-screen pb-4 bg-[#ebebeb]">
        {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectRoute><Home /></ProtectRoute>} />
          <Route path="/post/create" element={<ProtectRoute><Create /> </ProtectRoute>} />
          <Route path="/post/edit/:postId" element={<ProtectRoute> <Update /> </ProtectRoute>} />
          <Route path="/user/view/:postId" element={<ProtectRoute><View /></ProtectRoute> } />
          <Route path="/user/all" element={<ProtectRoute><AllPost /></ProtectRoute> } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/practice" element={<Main />} />
          
        </Routes>
      </BrowserRouter>
      <Toaster />
      <ToastContainer />
    </div>
  );
}
