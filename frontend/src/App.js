import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import PrivateComponent from "./components/PrivateComponent";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/add" element={<AddProduct />}></Route>
            <Route path="/update/:id" element={<UpdateProduct />}></Route>
            <Route
              path="/profile"
              element={<h1 className="text-black">Profile View</h1>}
            ></Route>
            <Route
              path="/logout"
              element={<h1 className="text-black">Logout</h1>}
            ></Route>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
