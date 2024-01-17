import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    let result = await fetch("http://localhost:5001/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    console.warn(result);
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="signup col-lg-5 m-5 p-5">
      <div className="card border-warning bg-white border border-warning border-2 rounded-4">
        <div className="card-title">
          <h1 className="m-4 mb-1">Sign Up</h1>
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
            <div className="input-group mb-4">
              <span className="input-group-text">
                <i className="bi bi-person-circle text-primary"></i>
              </span>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                required
                name="name"
                form="form1"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            {/* <div className="mb-4 input-group">
                    <span className="input-group-text">
                    <i className="bi bi-check-circle-fill text-primary"></i>
                    </span>
                    <input
                    type="password"
                    className="form-control"
                    id="InputPassword"
                    placeholder="Confirm Password"
                    required
                    name="confirm"
                    form="form1"
                    />
                </div> */}
            <div className="text-center">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={collectData}
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
