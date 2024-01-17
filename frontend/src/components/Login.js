import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const loginhandle = async () => {
    console.warn(email);
    let result = await fetch("http://localhost:5001/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please Enter Correct Details");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={loginhandle}
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
