import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const Login = () => {
  const [authUser] = useAuthState(auth);
  const [SignInWithEmailAndPass, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/todo";

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pass = event.target.pass.value;

    await SignInWithEmailAndPass(email, pass);
  };

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    if (authUser || user) {
      navigate(from, { replace: true });
    }
  }, [authUser, user, navigate, from]);

  return (
    <div className=" lg:max-w-lg md:max-w-md mx-auto my-20 px-5">
      <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
        Login
      </h2>
      <form onSubmit={handleLogin}>
        <input
          required
          type="text"
          name="email"
          placeholder="Enter Email"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <input
          required
          type="text"
          name="pass"
          placeholder="Enter Password"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <button className="btn btn-success w-full text-white mt-5">
          login
        </button>
        <p className="text-center mt-2">
          New to To Do List?{" "}
          <Link to="/signup" className=" text-orange-400">
            Create new account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
