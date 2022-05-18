import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2 className=" text-3xl lg:text-4xl text-center my-2 text-orange-400 font-bold">
        Welcome to To Do List !!!
      </h2>
      <p className="text-xl text-white mb-10">Please Login/Signup to use.</p>
      <Link to="login" className="btn btn-outline btn-primary mr-5 ">
        Login
      </Link>
      <Link to="/signup" className="btn btn-outline btn-primary">
        SignUp
      </Link>
    </div>
  );
};

export default Home;
