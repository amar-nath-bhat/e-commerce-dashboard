import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONNECTION_URI } from "../constants";

const loginInitialValues = {
  email: "",
  password: "",
};

function Login() {
  const [login, setLogin] = useState(loginInitialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    let result = await fetch(`${CONNECTION_URI}/login`, {
      method: "post",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      setLogin(loginInitialValues);
      alert(result.message);
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("user", result.user._id);
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="signup col-lg-5 m-5 p-5">
      <div className="card border-warning bg-white border border-warning border-2 rounded-4">
        <div className="card-title">
          <h1 className="m-4 mb-1">Log In</h1>
        </div>
        <div className="card-body text-start py-4 text-black">
          <form method="post" id="form1">
            <div className="input-group mb-4">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill text-primary"></i>
              </span>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                name="email"
                form="form1"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-4 input-group">
              <span className="input-group-text">
                <i className="bi bi-incognito text-primary"></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                placeholder="Password"
                required
                name="password"
                form="form1"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={() => handleLogin()}
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
