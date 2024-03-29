import React, { useState } from "react";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const ToDoList = () => {
  const [authUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const handleTaskForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userEmail = authUser.email;
    const taskName = event.target.name.value;
    const taskDesc = event.target.desc.value;
    const isCompleted = false;
    const task = { userEmail, taskName, taskDesc, isCompleted };

    await fetch(`https://todo-test-server-blue.vercel.app/api/v1/tasks`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Task Added");
        }
      });
    event.target.reset();
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" lg:max-w-lg md:max-w-md mx-auto my-20 px-5">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl text-center mb-10 text-orange-400 font-bold">
          To Do List
        </h2>
        <Link to="/all-tasks" className="btn btn-sm mt-[-25px]">
          See all task
        </Link>
      </div>
      <form onSubmit={handleTaskForm}>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          className="input mb-5 input-bordered w-full max-w-lg"
        />
        <br />
        <textarea
          name="desc"
          className="textarea textarea-bordered mb-5 w-full max-w-lg"
          placeholder="Task Description"
        ></textarea>
        <br />
        <button className="btn btn-success w-full text-white mt-2">
          add task
        </button>
      </form>
    </div>
  );
};

export default ToDoList;
