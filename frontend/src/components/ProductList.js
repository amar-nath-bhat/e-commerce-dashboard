import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5001/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5001/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    // console.warn(event.target.value);
    if (key) {
      let result = await fetch(`http://localhost:5001/search/${key}`);
      result = await result.json();
      console.warn(result);
      if (result) {
        setProducts(result);
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
        onChange={searchProduct}
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
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      deleteProduct(item._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`update/${item._id}`}>
                    <button className="btn btn-primary ms-2">Update</button>
                  </Link>
                </td>
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
