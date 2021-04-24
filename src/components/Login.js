import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useInput from "../hooks/useInput";
import { login } from "../reducers/user";
import "./signup.css"; 

const Login = ({ signup }) => {
  const dispatch = useDispatch();
  const email = useInput("");
  const password = useInput("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.value && !password.value) {
      return toast.info("all fields required")
    }

    const payload = {
      username: email.value,
      password: password.value,
    }

    const clearForm = () => {
      email.setValue("")
      password.setValue("")
    }

    dispatch(login({ payload, clearForm }));
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="johnwick@gmail.com"
            value={email.value}
            onChange={email.onChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={password.value}
            onChange={password.onChange}
          />

          <div className="login-signup">
            <p onClick={signup}>Sign up instead</p>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
