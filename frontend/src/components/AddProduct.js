import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONNECTION_URI } from "../constants";

const addProductInitialValues = {
  name: "",
  price: "",
  company: "",
  category: "",
  userID: "",
};

function AddProduct() {
  const [addProductDetails, setAddProductDetails] = useState(
    addProductInitialValues
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddProductDetails({
      ...addProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    console.log(addProductDetails);

    if (addProductDetails.userID === "") {
      addProductDetails.userID = sessionStorage.getItem("user");
    }
    let result = await fetch(`${CONNECTION_URI}/add-product`, {
      method: "post",
      body: JSON.stringify(addProductDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    result = await result.json();
    if (result.success) {
      alert(result.message);
      navigate("/");
      setAddProductDetails(addProductInitialValues);
    } else {
      setError(result.message);
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={() => addProduct()}
              >
                Add Product
              </button>
            </div>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
