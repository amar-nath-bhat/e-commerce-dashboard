import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(
      "https://e-commerce-dashboard-server.vercel.app/add-product",
      {
        method: "post",
        body: JSON.stringify({ name, price, company, category, userID }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();
    localStorage.setItem("product", JSON.stringify(result));
    console.warn(result);
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="add-product col-lg-5 m-5 p-5">
      <div className="card border-warning bg-white border border-warning border-2 rounded-4">
        <div className="card-title">
          <h1 className="m-4 mb-1">Add Product</h1>
        </div>
        <div className="card-body text-start py-4 text-black">
          <form method="post" id="form1">
            <div className="input-group mb-4">
              <span className="input-group-text">
                <i className="bi bi-box-fill text-primary"></i>
              </span>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Product Name"
                required
                name="name"
                form="form1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {error && !name && (
              <span className="invalid-input">Enter a valid name!</span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text">
                <i className="bi bi-currency-dollar text-primary"></i>
              </span>
              <input
                type="text"
                id="price"
                className="form-control"
                placeholder="Product Price"
                required
                name="price"
                form="form1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {error && !price && (
              <span className="invalid-input">Enter a valid price!</span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text">
                <i className="bi bi-tags-fill text-primary"></i>
              </span>
              <input
                type="text"
                id="category"
                className="form-control"
                placeholder="Product Category"
                required
                name="category"
                form="form1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {error && !category && (
              <span className="invalid-input">Enter a valid category!</span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text">
                <i className="bi bi-building-fill text-primary"></i>
              </span>
              <input
                type="text"
                id="company"
                className="form-control"
                placeholder="Company Name"
                required
                name="company"
                form="form1"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            {error && !company && (
              <span className="invalid-input">Enter a valid company!</span>
            )}
            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={addProduct}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
