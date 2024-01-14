import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    // console.warn(params.id);
    let result = await fetch(
      `https://e-commerce-dashboard-server.vercel.app/product/${params.id}`
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  // const updateProduct = async () => {
  //   let result = await fetch(`http://localhost:5001/product/${params.id}`, {
  //     method: "Put",
  //     body: JSON.stringify({ name, price, category, company }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   result = await result.json();
  //   localStorage.setItem("product", JSON.stringify(result));
  //   navigate("/");
  // };
  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(
      `https://e-commerce-dashboard-server.vercel.app/product/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="update-product col-lg-5 m-5 p-5">
      <div className="card border-warning bg-white border border-warning border-2 rounded-4">
        <div className="card-title">
          <h1 className="m-4 mb-1">Update Product</h1>
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
            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={updateProduct}
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
