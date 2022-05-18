import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

const Signup = () => {
  const [createUserWithEmailAndPass, user] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const pass = event.target.pass.value;

    await createUserWithEmailAndPass(email, pass);
    await updateProfile({ displayName: name });

    event.target.reset();
  };

  useEffect(() => {
    if (user) {
      toast.success("User Created");
      navigate("/todo");
    }
  }, [user, navigate]);

  return (
    <div className=" lg:max-w-lg  md:max-w-md mx-auto my-20 px-5">
      <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
        SignUp
      </h2>
      <form onSubmit={handleSignup}>
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
