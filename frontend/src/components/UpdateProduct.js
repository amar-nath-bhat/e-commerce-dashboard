import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CONNECTION_URI } from "../constants";

const updateInitialValues = {
  name: "",
  price: "",
  company: "",
  category: "",
};

function UpdateProduct() {
  const [updateValues, setUpdateValues] = useState(updateInitialValues);
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateValues({ ...updateValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getProductDetails = async () => {
      let result = await fetch(`${CONNECTION_URI}/product/${params.id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      result = await result.json();
      if (result.success) {
        setUpdateValues(result.product);
      } else {
        alert(result.message);
        navigate("/");
      }
    };
    getProductDetails();
  }, [params.id]);

  const updateProduct = async () => {
    let result = await fetch(`${CONNECTION_URI}/update/${params.id}`, {
      method: "Put",
      body: JSON.stringify(updateValues),
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    if (result.success) {
      alert(result.message);
      setUpdateValues(updateInitialValues);
      navigate("/");
    } else {
      alert(result.message);
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
                value={updateValues.name}
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
                value={updateValues.price}
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
                value={updateValues.category}
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
                value={updateValues.company}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={() => updateProduct()}
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
