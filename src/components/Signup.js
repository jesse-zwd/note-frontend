import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useInput from "../hooks/useInput";
import { signup } from "../reducers/user";
import "./signup.css";

const Signup = ({ login }) => {
  const dispatch = useDispatch();

  // form values
  const email = useInput("");
  const nickname = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!nickname.value && !password2.value && !password1.value && !email.value) {
      return toast.info("all fields required")
    }

    if (password1.value.trim() !== password2.value.trim()) {
      return toast.info("passwords don't match")
    }

    const payload = {
      username: email.value,
      password: password1.value,
      nickname: nickname.value,
    }

    const clearForm = () => {
      email.setValue("")
      password1.setValue("")
      password2.setValue("")
      nickname.setValue("")
    }

    dispatch(signup({ payload, clearForm }));
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Create your account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="nickname"
            placeholder="johnwick"
            value={nickname.value}
            onChange={nickname.onChange}
          />

          <input
            type="email"
            name="email"
            placeholder="johnwick@gmail.com"
            value={email.value}
            onChange={email.onChange}
          />

          <input
            type="password"
            name="password1"
            placeholder="password"
            value={password1.value}
            onChange={password1.onChange}
          />

          <input
            type="password"
            name="password2"
            placeholder="password again"
            value={password2.value}
            onChange={password2.onChange}
          />

          <div className="login-signup">
            <p onClick={login}>Sign in instead</p>
            <button>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
