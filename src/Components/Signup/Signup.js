import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import SocialSignup from "../SocialSignup/SocialSignup";

const Signup = () => {
  const [authUser] = useAuthState(auth);
  const [createUserWithEmailAndPass, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/todo";

  const handleSignup = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const pass = event.target.pass.value;

    await createUserWithEmailAndPass(email, pass);
    await updateProfile({ displayName: name });

    event.target.reset();
  };

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    if (authUser || user) {
      navigate(from, { replace: true });
    }
  }, [authUser, user, from, navigate]);

  return (
    <div className=" lg:max-w-lg  md:max-w-md mx-auto my-20 px-5">
      <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
        SignUp
      </h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <input
          type="text"
          name="pass"
          placeholder="Enter Password"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <button className="btn btn-success w-full text-white mt-5">
          sign up
        </button>
        <p className="text-center mt-2">
          Have an account?{" "}
          <Link to="/login" className="text-orange-400">
            Login
          </Link>
        </p>
      </form>
      <SocialSignup />
    </div>
  );
};

export default Signup;
