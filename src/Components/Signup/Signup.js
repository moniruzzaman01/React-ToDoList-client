import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className=" lg:max-w-lg  md:max-w-md mx-auto my-20 px-5">
      <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
        SignUp
      </h2>
      <form>
        <label htmlFor="">Name</label>
        <br />
        <input
          type="text"
          name="name"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <label htmlFor="">Email</label>
        <br />
        <input
          type="text"
          name="email"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <br />
        <label htmlFor="">Password</label>
        <br />
        <input
          type="text"
          name="pass"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <br />
        <button className="btn btn-success w-full text-white mt-5">
          sign up
        </button>
        <p className="text-center mt-10">
          Have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
      {/* <SocialSignup /> */}
    </div>
  );
};

export default Signup;
