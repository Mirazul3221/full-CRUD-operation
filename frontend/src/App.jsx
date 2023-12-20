import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="min-h-screen min-w-screen bg-rose-100">
      
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
</div>
  )
}