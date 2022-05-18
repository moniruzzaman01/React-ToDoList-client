import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Home = () => {
  const [authUser] = useAuthState(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/todo";

  useEffect(() => {
    if (authUser) {
      navigate(from, { replace: true });
    }
  }, [authUser, navigate, from]);

  return (
    <div>
      <h2 className=" text-3xl lg:text-4xl text-center my-2 font-bold text-gray-300">
        Welcome to <span className=" text-orange-400">To Do List !!!</span>
      </h2>
      <p className="text-xl text-gray-300 mb-10">Please Login/Signup to use.</p>
      <Link to="login" className="btn btn-outline btn-warning mr-5 ">
        Login
      </Link>
      <Link to="/signup" className="btn btn-outline btn-warning">
        SignUp
      </Link>
    </div>
  );
};

export default Home;
