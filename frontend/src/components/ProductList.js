import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CONNECTION_URI } from "../constants";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${CONNECTION_URI}/products`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    setProducts(result.products);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`${CONNECTION_URI}/delete/${id}`, {
      method: "Delete",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    if (result.success) {
      getProducts();
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    key = key.trim();
    if (key) {
      let result = await fetch(`${CONNECTION_URI}/search/${key}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      result = await result.json();
      if (result.success) {
        setProducts(result.products);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="table-responsive product-list container text-center mt-5  p-5 w-100 h-100">
      <h1>Product List</h1>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => searchProduct(e)}
      />
      <p
        className={products.length > 0 ? "d-none" : "d-block fs-1 text-danger"}
      >
        No Results Found!
      </p>
      <table className="table gap-3 mt-5">
        <thead className="table-dark">
          <tr>
            <th scope="col">SI No.</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Company</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        {products.length > 0 ? (
          <tbody>
            {products.map((item, index) => (
              <tr className="" key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>

                {item.userID === sessionStorage.getItem("user") ? (
                  <td className="btn-pair d-flex gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`update/${item._id}`}>
                      <button className="btn btn-primary">Update</button>
                    </Link>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </div>
  );
}

export default ProductList;
