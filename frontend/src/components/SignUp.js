import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONNECTION_URI } from "../constants";

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

function SignUp() {
  const [signup, setSignup] = useState(signupInitialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    // console.log(signup);
    let result = await fetch(`${CONNECTION_URI}/signup`, {
      method: "post",
      body: JSON.stringify(signup),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      setSignup(signupInitialValues);
      alert(result.message);
      navigate("/login");
    } else {
      alert(result.message);
      navigate("/signup");
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
                onChange={(e) => handleChange(e)}
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
                onClick={(e) => handleSignup(e)}
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
